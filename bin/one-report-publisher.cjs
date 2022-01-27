#!/usr/bin/env node
var __create = Object.create
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __getProtoOf = Object.getPrototypeOf
var __hasOwnProp = Object.prototype.hasOwnProperty
var __markAsModule = (target) => __defProp(target, '__esModule', { value: true })
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports
    )
  }
var __reExport = (target, module2, copyDefault, desc) => {
  if ((module2 && typeof module2 === 'object') || typeof module2 === 'function') {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== 'default'))
        __defProp(target, key, {
          get: () => module2[key],
          enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable,
        })
  }
  return target
}
var __toESM = (module2, isNodeMode) => {
  return __reExport(
    __markAsModule(
      __defProp(
        module2 != null ? __create(__getProtoOf(module2)) : {},
        'default',
        !isNodeMode && module2 && module2.__esModule
          ? { get: () => module2.default, enumerable: true }
          : { value: module2, enumerable: true }
      )
    ),
    module2
  )
}

// node_modules/commander/lib/error.js
var require_error = __commonJS({
  'node_modules/commander/lib/error.js'(exports) {
    var CommanderError = class extends Error {
      constructor(exitCode, code, message) {
        super(message)
        Error.captureStackTrace(this, this.constructor)
        this.name = this.constructor.name
        this.code = code
        this.exitCode = exitCode
        this.nestedError = void 0
      }
    }
    var InvalidArgumentError = class extends CommanderError {
      constructor(message) {
        super(1, 'commander.invalidArgument', message)
        Error.captureStackTrace(this, this.constructor)
        this.name = this.constructor.name
      }
    }
    exports.CommanderError = CommanderError
    exports.InvalidArgumentError = InvalidArgumentError
  },
})

// node_modules/commander/lib/argument.js
var require_argument = __commonJS({
  'node_modules/commander/lib/argument.js'(exports) {
    var { InvalidArgumentError } = require_error()
    var Argument = class {
      constructor(name, description) {
        this.description = description || ''
        this.variadic = false
        this.parseArg = void 0
        this.defaultValue = void 0
        this.defaultValueDescription = void 0
        this.argChoices = void 0
        switch (name[0]) {
          case '<':
            this.required = true
            this._name = name.slice(1, -1)
            break
          case '[':
            this.required = false
            this._name = name.slice(1, -1)
            break
          default:
            this.required = true
            this._name = name
            break
        }
        if (this._name.length > 3 && this._name.slice(-3) === '...') {
          this.variadic = true
          this._name = this._name.slice(0, -3)
        }
      }
      name() {
        return this._name
      }
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value]
        }
        return previous.concat(value)
      }
      default(value, description) {
        this.defaultValue = value
        this.defaultValueDescription = description
        return this
      }
      argParser(fn) {
        this.parseArg = fn
        return this
      }
      choices(values) {
        this.argChoices = values
        this.parseArg = (arg, previous) => {
          if (!values.includes(arg)) {
            throw new InvalidArgumentError(`Allowed choices are ${values.join(', ')}.`)
          }
          if (this.variadic) {
            return this._concatValue(arg, previous)
          }
          return arg
        }
        return this
      }
      argRequired() {
        this.required = true
        return this
      }
      argOptional() {
        this.required = false
        return this
      }
    }
    function humanReadableArgName(arg) {
      const nameOutput = arg.name() + (arg.variadic === true ? '...' : '')
      return arg.required ? '<' + nameOutput + '>' : '[' + nameOutput + ']'
    }
    exports.Argument = Argument
    exports.humanReadableArgName = humanReadableArgName
  },
})

// node_modules/commander/lib/help.js
var require_help = __commonJS({
  'node_modules/commander/lib/help.js'(exports) {
    var { humanReadableArgName } = require_argument()
    var Help = class {
      constructor() {
        this.helpWidth = void 0
        this.sortSubcommands = false
        this.sortOptions = false
      }
      visibleCommands(cmd) {
        const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden)
        if (cmd._hasImplicitHelpCommand()) {
          const [, helpName, helpArgs] = cmd._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/)
          const helpCommand = cmd.createCommand(helpName).helpOption(false)
          helpCommand.description(cmd._helpCommandDescription)
          if (helpArgs) helpCommand.arguments(helpArgs)
          visibleCommands.push(helpCommand)
        }
        if (this.sortSubcommands) {
          visibleCommands.sort((a, b) => {
            return a.name().localeCompare(b.name())
          })
        }
        return visibleCommands
      }
      visibleOptions(cmd) {
        const visibleOptions = cmd.options.filter((option) => !option.hidden)
        const showShortHelpFlag =
          cmd._hasHelpOption && cmd._helpShortFlag && !cmd._findOption(cmd._helpShortFlag)
        const showLongHelpFlag = cmd._hasHelpOption && !cmd._findOption(cmd._helpLongFlag)
        if (showShortHelpFlag || showLongHelpFlag) {
          let helpOption
          if (!showShortHelpFlag) {
            helpOption = cmd.createOption(cmd._helpLongFlag, cmd._helpDescription)
          } else if (!showLongHelpFlag) {
            helpOption = cmd.createOption(cmd._helpShortFlag, cmd._helpDescription)
          } else {
            helpOption = cmd.createOption(cmd._helpFlags, cmd._helpDescription)
          }
          visibleOptions.push(helpOption)
        }
        if (this.sortOptions) {
          const getSortKey = (option) => {
            return option.short ? option.short.replace(/^-/, '') : option.long.replace(/^--/, '')
          }
          visibleOptions.sort((a, b) => {
            return getSortKey(a).localeCompare(getSortKey(b))
          })
        }
        return visibleOptions
      }
      visibleArguments(cmd) {
        if (cmd._argsDescription) {
          cmd._args.forEach((argument) => {
            argument.description =
              argument.description || cmd._argsDescription[argument.name()] || ''
          })
        }
        if (cmd._args.find((argument) => argument.description)) {
          return cmd._args
        }
        return []
      }
      subcommandTerm(cmd) {
        const args = cmd._args.map((arg) => humanReadableArgName(arg)).join(' ')
        return (
          cmd._name +
          (cmd._aliases[0] ? '|' + cmd._aliases[0] : '') +
          (cmd.options.length ? ' [options]' : '') +
          (args ? ' ' + args : '')
        )
      }
      optionTerm(option) {
        return option.flags
      }
      argumentTerm(argument) {
        return argument.name()
      }
      longestSubcommandTermLength(cmd, helper) {
        return helper.visibleCommands(cmd).reduce((max, command) => {
          return Math.max(max, helper.subcommandTerm(command).length)
        }, 0)
      }
      longestOptionTermLength(cmd, helper) {
        return helper.visibleOptions(cmd).reduce((max, option) => {
          return Math.max(max, helper.optionTerm(option).length)
        }, 0)
      }
      longestArgumentTermLength(cmd, helper) {
        return helper.visibleArguments(cmd).reduce((max, argument) => {
          return Math.max(max, helper.argumentTerm(argument).length)
        }, 0)
      }
      commandUsage(cmd) {
        let cmdName = cmd._name
        if (cmd._aliases[0]) {
          cmdName = cmdName + '|' + cmd._aliases[0]
        }
        let parentCmdNames = ''
        for (let parentCmd = cmd.parent; parentCmd; parentCmd = parentCmd.parent) {
          parentCmdNames = parentCmd.name() + ' ' + parentCmdNames
        }
        return parentCmdNames + cmdName + ' ' + cmd.usage()
      }
      commandDescription(cmd) {
        return cmd.description()
      }
      subcommandDescription(cmd) {
        return cmd.description()
      }
      optionDescription(option) {
        const extraInfo = []
        if (option.argChoices && !option.negate) {
          extraInfo.push(
            `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(', ')}`
          )
        }
        if (option.defaultValue !== void 0 && !option.negate) {
          extraInfo.push(
            `default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`
          )
        }
        if (option.envVar !== void 0) {
          extraInfo.push(`env: ${option.envVar}`)
        }
        if (extraInfo.length > 0) {
          return `${option.description} (${extraInfo.join(', ')})`
        }
        return option.description
      }
      argumentDescription(argument) {
        const extraInfo = []
        if (argument.argChoices) {
          extraInfo.push(
            `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(', ')}`
          )
        }
        if (argument.defaultValue !== void 0) {
          extraInfo.push(
            `default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`
          )
        }
        if (extraInfo.length > 0) {
          const extraDescripton = `(${extraInfo.join(', ')})`
          if (argument.description) {
            return `${argument.description} ${extraDescripton}`
          }
          return extraDescripton
        }
        return argument.description
      }
      formatHelp(cmd, helper) {
        const termWidth = helper.padWidth(cmd, helper)
        const helpWidth = helper.helpWidth || 80
        const itemIndentWidth = 2
        const itemSeparatorWidth = 2
        function formatItem(term, description) {
          if (description) {
            const fullText = `${term.padEnd(termWidth + itemSeparatorWidth)}${description}`
            return helper.wrap(
              fullText,
              helpWidth - itemIndentWidth,
              termWidth + itemSeparatorWidth
            )
          }
          return term
        }
        function formatList(textArray) {
          return textArray.join('\n').replace(/^/gm, ' '.repeat(itemIndentWidth))
        }
        let output = [`Usage: ${helper.commandUsage(cmd)}`, '']
        const commandDescription = helper.commandDescription(cmd)
        if (commandDescription.length > 0) {
          output = output.concat([commandDescription, ''])
        }
        const argumentList = helper.visibleArguments(cmd).map((argument) => {
          return formatItem(helper.argumentTerm(argument), helper.argumentDescription(argument))
        })
        if (argumentList.length > 0) {
          output = output.concat(['Arguments:', formatList(argumentList), ''])
        }
        const optionList = helper.visibleOptions(cmd).map((option) => {
          return formatItem(helper.optionTerm(option), helper.optionDescription(option))
        })
        if (optionList.length > 0) {
          output = output.concat(['Options:', formatList(optionList), ''])
        }
        const commandList = helper.visibleCommands(cmd).map((cmd2) => {
          return formatItem(helper.subcommandTerm(cmd2), helper.subcommandDescription(cmd2))
        })
        if (commandList.length > 0) {
          output = output.concat(['Commands:', formatList(commandList), ''])
        }
        return output.join('\n')
      }
      padWidth(cmd, helper) {
        return Math.max(
          helper.longestOptionTermLength(cmd, helper),
          helper.longestSubcommandTermLength(cmd, helper),
          helper.longestArgumentTermLength(cmd, helper)
        )
      }
      wrap(str, width, indent, minColumnWidth = 40) {
        if (str.match(/[\n]\s+/)) return str
        const columnWidth = width - indent
        if (columnWidth < minColumnWidth) return str
        const leadingStr = str.substr(0, indent)
        const columnText = str.substr(indent)
        const indentString = ' '.repeat(indent)
        const regex = new RegExp(
          '.{1,' + (columnWidth - 1) + '}([\\s\u200B]|$)|[^\\s\u200B]+?([\\s\u200B]|$)',
          'g'
        )
        const lines = columnText.match(regex) || []
        return (
          leadingStr +
          lines
            .map((line, i) => {
              if (line.slice(-1) === '\n') {
                line = line.slice(0, line.length - 1)
              }
              return (i > 0 ? indentString : '') + line.trimRight()
            })
            .join('\n')
        )
      }
    }
    exports.Help = Help
  },
})

// node_modules/commander/lib/option.js
var require_option = __commonJS({
  'node_modules/commander/lib/option.js'(exports) {
    var { InvalidArgumentError } = require_error()
    var Option = class {
      constructor(flags, description) {
        this.flags = flags
        this.description = description || ''
        this.required = flags.includes('<')
        this.optional = flags.includes('[')
        this.variadic = /\w\.\.\.[>\]]$/.test(flags)
        this.mandatory = false
        const optionFlags = splitOptionFlags(flags)
        this.short = optionFlags.shortFlag
        this.long = optionFlags.longFlag
        this.negate = false
        if (this.long) {
          this.negate = this.long.startsWith('--no-')
        }
        this.defaultValue = void 0
        this.defaultValueDescription = void 0
        this.envVar = void 0
        this.parseArg = void 0
        this.hidden = false
        this.argChoices = void 0
      }
      default(value, description) {
        this.defaultValue = value
        this.defaultValueDescription = description
        return this
      }
      env(name) {
        this.envVar = name
        return this
      }
      argParser(fn) {
        this.parseArg = fn
        return this
      }
      makeOptionMandatory(mandatory = true) {
        this.mandatory = !!mandatory
        return this
      }
      hideHelp(hide = true) {
        this.hidden = !!hide
        return this
      }
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value]
        }
        return previous.concat(value)
      }
      choices(values) {
        this.argChoices = values
        this.parseArg = (arg, previous) => {
          if (!values.includes(arg)) {
            throw new InvalidArgumentError(`Allowed choices are ${values.join(', ')}.`)
          }
          if (this.variadic) {
            return this._concatValue(arg, previous)
          }
          return arg
        }
        return this
      }
      name() {
        if (this.long) {
          return this.long.replace(/^--/, '')
        }
        return this.short.replace(/^-/, '')
      }
      attributeName() {
        return camelcase(this.name().replace(/^no-/, ''))
      }
      is(arg) {
        return this.short === arg || this.long === arg
      }
    }
    function camelcase(str) {
      return str.split('-').reduce((str2, word) => {
        return str2 + word[0].toUpperCase() + word.slice(1)
      })
    }
    function splitOptionFlags(flags) {
      let shortFlag
      let longFlag
      const flagParts = flags.split(/[ |,]+/)
      if (flagParts.length > 1 && !/^[[<]/.test(flagParts[1])) shortFlag = flagParts.shift()
      longFlag = flagParts.shift()
      if (!shortFlag && /^-[^-]$/.test(longFlag)) {
        shortFlag = longFlag
        longFlag = void 0
      }
      return { shortFlag, longFlag }
    }
    exports.Option = Option
    exports.splitOptionFlags = splitOptionFlags
  },
})

// node_modules/commander/lib/suggestSimilar.js
var require_suggestSimilar = __commonJS({
  'node_modules/commander/lib/suggestSimilar.js'(exports) {
    var maxDistance = 3
    function editDistance(a, b) {
      if (Math.abs(a.length - b.length) > maxDistance) return Math.max(a.length, b.length)
      const d = []
      for (let i = 0; i <= a.length; i++) {
        d[i] = [i]
      }
      for (let j = 0; j <= b.length; j++) {
        d[0][j] = j
      }
      for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
          let cost = 1
          if (a[i - 1] === b[j - 1]) {
            cost = 0
          } else {
            cost = 1
          }
          d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
          if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
            d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1)
          }
        }
      }
      return d[a.length][b.length]
    }
    function suggestSimilar(word, candidates) {
      if (!candidates || candidates.length === 0) return ''
      candidates = Array.from(new Set(candidates))
      const searchingOptions = word.startsWith('--')
      if (searchingOptions) {
        word = word.slice(2)
        candidates = candidates.map((candidate) => candidate.slice(2))
      }
      let similar = []
      let bestDistance = maxDistance
      const minSimilarity = 0.4
      candidates.forEach((candidate) => {
        if (candidate.length <= 1) return
        const distance = editDistance(word, candidate)
        const length = Math.max(word.length, candidate.length)
        const similarity = (length - distance) / length
        if (similarity > minSimilarity) {
          if (distance < bestDistance) {
            bestDistance = distance
            similar = [candidate]
          } else if (distance === bestDistance) {
            similar.push(candidate)
          }
        }
      })
      similar.sort((a, b) => a.localeCompare(b))
      if (searchingOptions) {
        similar = similar.map((candidate) => `--${candidate}`)
      }
      if (similar.length > 1) {
        return `
(Did you mean one of ${similar.join(', ')}?)`
      }
      if (similar.length === 1) {
        return `
(Did you mean ${similar[0]}?)`
      }
      return ''
    }
    exports.suggestSimilar = suggestSimilar
  },
})

// node_modules/commander/lib/command.js
var require_command = __commonJS({
  'node_modules/commander/lib/command.js'(exports) {
    var EventEmitter = require('events').EventEmitter
    var childProcess = require('child_process')
    var path = require('path')
    var fs2 = require('fs')
    var { Argument, humanReadableArgName } = require_argument()
    var { CommanderError } = require_error()
    var { Help } = require_help()
    var { Option, splitOptionFlags } = require_option()
    var { suggestSimilar } = require_suggestSimilar()
    var Command2 = class extends EventEmitter {
      constructor(name) {
        super()
        this.commands = []
        this.options = []
        this.parent = null
        this._allowUnknownOption = false
        this._allowExcessArguments = true
        this._args = []
        this.args = []
        this.rawArgs = []
        this.processedArgs = []
        this._scriptPath = null
        this._name = name || ''
        this._optionValues = {}
        this._optionValueSources = {}
        this._storeOptionsAsProperties = false
        this._actionHandler = null
        this._executableHandler = false
        this._executableFile = null
        this._defaultCommandName = null
        this._exitCallback = null
        this._aliases = []
        this._combineFlagAndOptionalValue = true
        this._description = ''
        this._argsDescription = void 0
        this._enablePositionalOptions = false
        this._passThroughOptions = false
        this._lifeCycleHooks = {}
        this._showHelpAfterError = false
        this._showSuggestionAfterError = false
        this._outputConfiguration = {
          writeOut: (str) => process.stdout.write(str),
          writeErr: (str) => process.stderr.write(str),
          getOutHelpWidth: () => (process.stdout.isTTY ? process.stdout.columns : void 0),
          getErrHelpWidth: () => (process.stderr.isTTY ? process.stderr.columns : void 0),
          outputError: (str, write) => write(str),
        }
        this._hidden = false
        this._hasHelpOption = true
        this._helpFlags = '-h, --help'
        this._helpDescription = 'display help for command'
        this._helpShortFlag = '-h'
        this._helpLongFlag = '--help'
        this._addImplicitHelpCommand = void 0
        this._helpCommandName = 'help'
        this._helpCommandnameAndArgs = 'help [command]'
        this._helpCommandDescription = 'display help for command'
        this._helpConfiguration = {}
      }
      copyInheritedSettings(sourceCommand) {
        this._outputConfiguration = sourceCommand._outputConfiguration
        this._hasHelpOption = sourceCommand._hasHelpOption
        this._helpFlags = sourceCommand._helpFlags
        this._helpDescription = sourceCommand._helpDescription
        this._helpShortFlag = sourceCommand._helpShortFlag
        this._helpLongFlag = sourceCommand._helpLongFlag
        this._helpCommandName = sourceCommand._helpCommandName
        this._helpCommandnameAndArgs = sourceCommand._helpCommandnameAndArgs
        this._helpCommandDescription = sourceCommand._helpCommandDescription
        this._helpConfiguration = sourceCommand._helpConfiguration
        this._exitCallback = sourceCommand._exitCallback
        this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties
        this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue
        this._allowExcessArguments = sourceCommand._allowExcessArguments
        this._enablePositionalOptions = sourceCommand._enablePositionalOptions
        this._showHelpAfterError = sourceCommand._showHelpAfterError
        this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError
        return this
      }
      command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
        let desc = actionOptsOrExecDesc
        let opts = execOpts
        if (typeof desc === 'object' && desc !== null) {
          opts = desc
          desc = null
        }
        opts = opts || {}
        const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/)
        const cmd = this.createCommand(name)
        if (desc) {
          cmd.description(desc)
          cmd._executableHandler = true
        }
        if (opts.isDefault) this._defaultCommandName = cmd._name
        cmd._hidden = !!(opts.noHelp || opts.hidden)
        cmd._executableFile = opts.executableFile || null
        if (args) cmd.arguments(args)
        this.commands.push(cmd)
        cmd.parent = this
        cmd.copyInheritedSettings(this)
        if (desc) return this
        return cmd
      }
      createCommand(name) {
        return new Command2(name)
      }
      createHelp() {
        return Object.assign(new Help(), this.configureHelp())
      }
      configureHelp(configuration) {
        if (configuration === void 0) return this._helpConfiguration
        this._helpConfiguration = configuration
        return this
      }
      configureOutput(configuration) {
        if (configuration === void 0) return this._outputConfiguration
        Object.assign(this._outputConfiguration, configuration)
        return this
      }
      showHelpAfterError(displayHelp = true) {
        if (typeof displayHelp !== 'string') displayHelp = !!displayHelp
        this._showHelpAfterError = displayHelp
        return this
      }
      showSuggestionAfterError(displaySuggestion = true) {
        this._showSuggestionAfterError = !!displaySuggestion
        return this
      }
      addCommand(cmd, opts) {
        if (!cmd._name) throw new Error('Command passed to .addCommand() must have a name')
        function checkExplicitNames(commandArray) {
          commandArray.forEach((cmd2) => {
            if (cmd2._executableHandler && !cmd2._executableFile) {
              throw new Error(
                `Must specify executableFile for deeply nested executable: ${cmd2.name()}`
              )
            }
            checkExplicitNames(cmd2.commands)
          })
        }
        checkExplicitNames(cmd.commands)
        opts = opts || {}
        if (opts.isDefault) this._defaultCommandName = cmd._name
        if (opts.noHelp || opts.hidden) cmd._hidden = true
        this.commands.push(cmd)
        cmd.parent = this
        return this
      }
      createArgument(name, description) {
        return new Argument(name, description)
      }
      argument(name, description, fn, defaultValue) {
        const argument = this.createArgument(name, description)
        if (typeof fn === 'function') {
          argument.default(defaultValue).argParser(fn)
        } else {
          argument.default(fn)
        }
        this.addArgument(argument)
        return this
      }
      arguments(names) {
        names.split(/ +/).forEach((detail) => {
          this.argument(detail)
        })
        return this
      }
      addArgument(argument) {
        const previousArgument = this._args.slice(-1)[0]
        if (previousArgument && previousArgument.variadic) {
          throw new Error(`only the last argument can be variadic '${previousArgument.name()}'`)
        }
        if (argument.required && argument.defaultValue !== void 0 && argument.parseArg === void 0) {
          throw new Error(
            `a default value for a required argument is never used: '${argument.name()}'`
          )
        }
        this._args.push(argument)
        return this
      }
      addHelpCommand(enableOrNameAndArgs, description) {
        if (enableOrNameAndArgs === false) {
          this._addImplicitHelpCommand = false
        } else {
          this._addImplicitHelpCommand = true
          if (typeof enableOrNameAndArgs === 'string') {
            this._helpCommandName = enableOrNameAndArgs.split(' ')[0]
            this._helpCommandnameAndArgs = enableOrNameAndArgs
          }
          this._helpCommandDescription = description || this._helpCommandDescription
        }
        return this
      }
      _hasImplicitHelpCommand() {
        if (this._addImplicitHelpCommand === void 0) {
          return this.commands.length && !this._actionHandler && !this._findCommand('help')
        }
        return this._addImplicitHelpCommand
      }
      hook(event, listener) {
        const allowedValues = ['preAction', 'postAction']
        if (!allowedValues.includes(event)) {
          throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`)
        }
        if (this._lifeCycleHooks[event]) {
          this._lifeCycleHooks[event].push(listener)
        } else {
          this._lifeCycleHooks[event] = [listener]
        }
        return this
      }
      exitOverride(fn) {
        if (fn) {
          this._exitCallback = fn
        } else {
          this._exitCallback = (err) => {
            if (err.code !== 'commander.executeSubCommandAsync') {
              throw err
            } else {
            }
          }
        }
        return this
      }
      _exit(exitCode, code, message) {
        if (this._exitCallback) {
          this._exitCallback(new CommanderError(exitCode, code, message))
        }
        process.exit(exitCode)
      }
      action(fn) {
        const listener = (args) => {
          const expectedArgsCount = this._args.length
          const actionArgs = args.slice(0, expectedArgsCount)
          if (this._storeOptionsAsProperties) {
            actionArgs[expectedArgsCount] = this
          } else {
            actionArgs[expectedArgsCount] = this.opts()
          }
          actionArgs.push(this)
          return fn.apply(this, actionArgs)
        }
        this._actionHandler = listener
        return this
      }
      createOption(flags, description) {
        return new Option(flags, description)
      }
      addOption(option) {
        const oname = option.name()
        const name = option.attributeName()
        let defaultValue = option.defaultValue
        if (
          option.negate ||
          option.optional ||
          option.required ||
          typeof defaultValue === 'boolean'
        ) {
          if (option.negate) {
            const positiveLongFlag = option.long.replace(/^--no-/, '--')
            defaultValue = this._findOption(positiveLongFlag) ? this.getOptionValue(name) : true
          }
          if (defaultValue !== void 0) {
            this.setOptionValueWithSource(name, defaultValue, 'default')
          }
        }
        this.options.push(option)
        const handleOptionValue = (val, invalidValueMessage, valueSource) => {
          const oldValue = this.getOptionValue(name)
          if (val !== null && option.parseArg) {
            try {
              val = option.parseArg(val, oldValue === void 0 ? defaultValue : oldValue)
            } catch (err) {
              if (err.code === 'commander.invalidArgument') {
                const message = `${invalidValueMessage} ${err.message}`
                this._displayError(err.exitCode, err.code, message)
              }
              throw err
            }
          } else if (val !== null && option.variadic) {
            val = option._concatValue(val, oldValue)
          }
          if (typeof oldValue === 'boolean' || typeof oldValue === 'undefined') {
            if (val == null) {
              this.setOptionValueWithSource(
                name,
                option.negate ? false : defaultValue || true,
                valueSource
              )
            } else {
              this.setOptionValueWithSource(name, val, valueSource)
            }
          } else if (val !== null) {
            this.setOptionValueWithSource(name, option.negate ? false : val, valueSource)
          }
        }
        this.on('option:' + oname, (val) => {
          const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`
          handleOptionValue(val, invalidValueMessage, 'cli')
        })
        if (option.envVar) {
          this.on('optionEnv:' + oname, (val) => {
            const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`
            handleOptionValue(val, invalidValueMessage, 'env')
          })
        }
        return this
      }
      _optionEx(config, flags, description, fn, defaultValue) {
        const option = this.createOption(flags, description)
        option.makeOptionMandatory(!!config.mandatory)
        if (typeof fn === 'function') {
          option.default(defaultValue).argParser(fn)
        } else if (fn instanceof RegExp) {
          const regex = fn
          fn = (val, def) => {
            const m = regex.exec(val)
            return m ? m[0] : def
          }
          option.default(defaultValue).argParser(fn)
        } else {
          option.default(fn)
        }
        return this.addOption(option)
      }
      option(flags, description, fn, defaultValue) {
        return this._optionEx({}, flags, description, fn, defaultValue)
      }
      requiredOption(flags, description, fn, defaultValue) {
        return this._optionEx({ mandatory: true }, flags, description, fn, defaultValue)
      }
      combineFlagAndOptionalValue(combine = true) {
        this._combineFlagAndOptionalValue = !!combine
        return this
      }
      allowUnknownOption(allowUnknown = true) {
        this._allowUnknownOption = !!allowUnknown
        return this
      }
      allowExcessArguments(allowExcess = true) {
        this._allowExcessArguments = !!allowExcess
        return this
      }
      enablePositionalOptions(positional = true) {
        this._enablePositionalOptions = !!positional
        return this
      }
      passThroughOptions(passThrough = true) {
        this._passThroughOptions = !!passThrough
        if (!!this.parent && passThrough && !this.parent._enablePositionalOptions) {
          throw new Error(
            'passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)'
          )
        }
        return this
      }
      storeOptionsAsProperties(storeAsProperties = true) {
        this._storeOptionsAsProperties = !!storeAsProperties
        if (this.options.length) {
          throw new Error('call .storeOptionsAsProperties() before adding options')
        }
        return this
      }
      getOptionValue(key) {
        if (this._storeOptionsAsProperties) {
          return this[key]
        }
        return this._optionValues[key]
      }
      setOptionValue(key, value) {
        if (this._storeOptionsAsProperties) {
          this[key] = value
        } else {
          this._optionValues[key] = value
        }
        return this
      }
      setOptionValueWithSource(key, value, source) {
        this.setOptionValue(key, value)
        this._optionValueSources[key] = source
        return this
      }
      getOptionValueSource(key) {
        return this._optionValueSources[key]
      }
      _prepareUserArgs(argv, parseOptions) {
        if (argv !== void 0 && !Array.isArray(argv)) {
          throw new Error('first parameter to parse must be array or undefined')
        }
        parseOptions = parseOptions || {}
        if (argv === void 0) {
          argv = process.argv
          if (process.versions && process.versions.electron) {
            parseOptions.from = 'electron'
          }
        }
        this.rawArgs = argv.slice()
        let userArgs
        switch (parseOptions.from) {
          case void 0:
          case 'node':
            this._scriptPath = argv[1]
            userArgs = argv.slice(2)
            break
          case 'electron':
            if (process.defaultApp) {
              this._scriptPath = argv[1]
              userArgs = argv.slice(2)
            } else {
              userArgs = argv.slice(1)
            }
            break
          case 'user':
            userArgs = argv.slice(0)
            break
          default:
            throw new Error(`unexpected parse option { from: '${parseOptions.from}' }`)
        }
        if (!this._scriptPath && require.main) {
          this._scriptPath = require.main.filename
        }
        this._name =
          this._name ||
          (this._scriptPath && path.basename(this._scriptPath, path.extname(this._scriptPath)))
        return userArgs
      }
      parse(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions)
        this._parseCommand([], userArgs)
        return this
      }
      async parseAsync(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions)
        await this._parseCommand([], userArgs)
        return this
      }
      _executeSubCommand(subcommand, args) {
        args = args.slice()
        let launchWithNode = false
        const sourceExt = ['.js', '.ts', '.tsx', '.mjs', '.cjs']
        this._checkForMissingMandatoryOptions()
        let scriptPath = this._scriptPath
        if (!scriptPath && require.main) {
          scriptPath = require.main.filename
        }
        let baseDir
        try {
          const resolvedLink = fs2.realpathSync(scriptPath)
          baseDir = path.dirname(resolvedLink)
        } catch (e) {
          baseDir = '.'
        }
        let bin = path.basename(scriptPath, path.extname(scriptPath)) + '-' + subcommand._name
        if (subcommand._executableFile) {
          bin = subcommand._executableFile
        }
        const localBin = path.join(baseDir, bin)
        if (fs2.existsSync(localBin)) {
          bin = localBin
        } else {
          sourceExt.forEach((ext) => {
            if (fs2.existsSync(`${localBin}${ext}`)) {
              bin = `${localBin}${ext}`
            }
          })
        }
        launchWithNode = sourceExt.includes(path.extname(bin))
        let proc
        if (process.platform !== 'win32') {
          if (launchWithNode) {
            args.unshift(bin)
            args = incrementNodeInspectorPort(process.execArgv).concat(args)
            proc = childProcess.spawn(process.argv[0], args, { stdio: 'inherit' })
          } else {
            proc = childProcess.spawn(bin, args, { stdio: 'inherit' })
          }
        } else {
          args.unshift(bin)
          args = incrementNodeInspectorPort(process.execArgv).concat(args)
          proc = childProcess.spawn(process.execPath, args, { stdio: 'inherit' })
        }
        const signals = ['SIGUSR1', 'SIGUSR2', 'SIGTERM', 'SIGINT', 'SIGHUP']
        signals.forEach((signal) => {
          process.on(signal, () => {
            if (proc.killed === false && proc.exitCode === null) {
              proc.kill(signal)
            }
          })
        })
        const exitCallback = this._exitCallback
        if (!exitCallback) {
          proc.on('close', process.exit.bind(process))
        } else {
          proc.on('close', () => {
            exitCallback(
              new CommanderError(
                process.exitCode || 0,
                'commander.executeSubCommandAsync',
                '(close)'
              )
            )
          })
        }
        proc.on('error', (err) => {
          if (err.code === 'ENOENT') {
            const executableMissing = `'${bin}' does not exist
 - if '${subcommand._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name`
            throw new Error(executableMissing)
          } else if (err.code === 'EACCES') {
            throw new Error(`'${bin}' not executable`)
          }
          if (!exitCallback) {
            process.exit(1)
          } else {
            const wrappedError = new CommanderError(
              1,
              'commander.executeSubCommandAsync',
              '(error)'
            )
            wrappedError.nestedError = err
            exitCallback(wrappedError)
          }
        })
        this.runningCommand = proc
      }
      _dispatchSubcommand(commandName, operands, unknown) {
        const subCommand = this._findCommand(commandName)
        if (!subCommand) this.help({ error: true })
        if (subCommand._executableHandler) {
          this._executeSubCommand(subCommand, operands.concat(unknown))
        } else {
          return subCommand._parseCommand(operands, unknown)
        }
      }
      _checkNumberOfArguments() {
        this._args.forEach((arg, i) => {
          if (arg.required && this.args[i] == null) {
            this.missingArgument(arg.name())
          }
        })
        if (this._args.length > 0 && this._args[this._args.length - 1].variadic) {
          return
        }
        if (this.args.length > this._args.length) {
          this._excessArguments(this.args)
        }
      }
      _processArguments() {
        const myParseArg = (argument, value, previous) => {
          let parsedValue = value
          if (value !== null && argument.parseArg) {
            try {
              parsedValue = argument.parseArg(value, previous)
            } catch (err) {
              if (err.code === 'commander.invalidArgument') {
                const message = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'. ${
                  err.message
                }`
                this._displayError(err.exitCode, err.code, message)
              }
              throw err
            }
          }
          return parsedValue
        }
        this._checkNumberOfArguments()
        const processedArgs = []
        this._args.forEach((declaredArg, index) => {
          let value = declaredArg.defaultValue
          if (declaredArg.variadic) {
            if (index < this.args.length) {
              value = this.args.slice(index)
              if (declaredArg.parseArg) {
                value = value.reduce((processed, v) => {
                  return myParseArg(declaredArg, v, processed)
                }, declaredArg.defaultValue)
              }
            } else if (value === void 0) {
              value = []
            }
          } else if (index < this.args.length) {
            value = this.args[index]
            if (declaredArg.parseArg) {
              value = myParseArg(declaredArg, value, declaredArg.defaultValue)
            }
          }
          processedArgs[index] = value
        })
        this.processedArgs = processedArgs
      }
      _chainOrCall(promise, fn) {
        if (promise && promise.then && typeof promise.then === 'function') {
          return promise.then(() => fn())
        }
        return fn()
      }
      _chainOrCallHooks(promise, event) {
        let result = promise
        const hooks = []
        getCommandAndParents(this)
          .reverse()
          .filter((cmd) => cmd._lifeCycleHooks[event] !== void 0)
          .forEach((hookedCommand) => {
            hookedCommand._lifeCycleHooks[event].forEach((callback) => {
              hooks.push({ hookedCommand, callback })
            })
          })
        if (event === 'postAction') {
          hooks.reverse()
        }
        hooks.forEach((hookDetail) => {
          result = this._chainOrCall(result, () => {
            return hookDetail.callback(hookDetail.hookedCommand, this)
          })
        })
        return result
      }
      _parseCommand(operands, unknown) {
        const parsed = this.parseOptions(unknown)
        this._parseOptionsEnv()
        operands = operands.concat(parsed.operands)
        unknown = parsed.unknown
        this.args = operands.concat(unknown)
        if (operands && this._findCommand(operands[0])) {
          return this._dispatchSubcommand(operands[0], operands.slice(1), unknown)
        }
        if (this._hasImplicitHelpCommand() && operands[0] === this._helpCommandName) {
          if (operands.length === 1) {
            this.help()
          }
          return this._dispatchSubcommand(operands[1], [], [this._helpLongFlag])
        }
        if (this._defaultCommandName) {
          outputHelpIfRequested(this, unknown)
          return this._dispatchSubcommand(this._defaultCommandName, operands, unknown)
        }
        if (
          this.commands.length &&
          this.args.length === 0 &&
          !this._actionHandler &&
          !this._defaultCommandName
        ) {
          this.help({ error: true })
        }
        outputHelpIfRequested(this, parsed.unknown)
        this._checkForMissingMandatoryOptions()
        const checkForUnknownOptions = () => {
          if (parsed.unknown.length > 0) {
            this.unknownOption(parsed.unknown[0])
          }
        }
        const commandEvent = `command:${this.name()}`
        if (this._actionHandler) {
          checkForUnknownOptions()
          this._processArguments()
          let actionResult
          actionResult = this._chainOrCallHooks(actionResult, 'preAction')
          actionResult = this._chainOrCall(actionResult, () =>
            this._actionHandler(this.processedArgs)
          )
          if (this.parent) this.parent.emit(commandEvent, operands, unknown)
          actionResult = this._chainOrCallHooks(actionResult, 'postAction')
          return actionResult
        }
        if (this.parent && this.parent.listenerCount(commandEvent)) {
          checkForUnknownOptions()
          this._processArguments()
          this.parent.emit(commandEvent, operands, unknown)
        } else if (operands.length) {
          if (this._findCommand('*')) {
            return this._dispatchSubcommand('*', operands, unknown)
          }
          if (this.listenerCount('command:*')) {
            this.emit('command:*', operands, unknown)
          } else if (this.commands.length) {
            this.unknownCommand()
          } else {
            checkForUnknownOptions()
            this._processArguments()
          }
        } else if (this.commands.length) {
          checkForUnknownOptions()
          this.help({ error: true })
        } else {
          checkForUnknownOptions()
          this._processArguments()
        }
      }
      _findCommand(name) {
        if (!name) return void 0
        return this.commands.find((cmd) => cmd._name === name || cmd._aliases.includes(name))
      }
      _findOption(arg) {
        return this.options.find((option) => option.is(arg))
      }
      _checkForMissingMandatoryOptions() {
        for (let cmd = this; cmd; cmd = cmd.parent) {
          cmd.options.forEach((anOption) => {
            if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === void 0) {
              cmd.missingMandatoryOptionValue(anOption)
            }
          })
        }
      }
      parseOptions(argv) {
        const operands = []
        const unknown = []
        let dest = operands
        const args = argv.slice()
        function maybeOption(arg) {
          return arg.length > 1 && arg[0] === '-'
        }
        let activeVariadicOption = null
        while (args.length) {
          const arg = args.shift()
          if (arg === '--') {
            if (dest === unknown) dest.push(arg)
            dest.push(...args)
            break
          }
          if (activeVariadicOption && !maybeOption(arg)) {
            this.emit(`option:${activeVariadicOption.name()}`, arg)
            continue
          }
          activeVariadicOption = null
          if (maybeOption(arg)) {
            const option = this._findOption(arg)
            if (option) {
              if (option.required) {
                const value = args.shift()
                if (value === void 0) this.optionMissingArgument(option)
                this.emit(`option:${option.name()}`, value)
              } else if (option.optional) {
                let value = null
                if (args.length > 0 && !maybeOption(args[0])) {
                  value = args.shift()
                }
                this.emit(`option:${option.name()}`, value)
              } else {
                this.emit(`option:${option.name()}`)
              }
              activeVariadicOption = option.variadic ? option : null
              continue
            }
          }
          if (arg.length > 2 && arg[0] === '-' && arg[1] !== '-') {
            const option = this._findOption(`-${arg[1]}`)
            if (option) {
              if (option.required || (option.optional && this._combineFlagAndOptionalValue)) {
                this.emit(`option:${option.name()}`, arg.slice(2))
              } else {
                this.emit(`option:${option.name()}`)
                args.unshift(`-${arg.slice(2)}`)
              }
              continue
            }
          }
          if (/^--[^=]+=/.test(arg)) {
            const index = arg.indexOf('=')
            const option = this._findOption(arg.slice(0, index))
            if (option && (option.required || option.optional)) {
              this.emit(`option:${option.name()}`, arg.slice(index + 1))
              continue
            }
          }
          if (maybeOption(arg)) {
            dest = unknown
          }
          if (
            (this._enablePositionalOptions || this._passThroughOptions) &&
            operands.length === 0 &&
            unknown.length === 0
          ) {
            if (this._findCommand(arg)) {
              operands.push(arg)
              if (args.length > 0) unknown.push(...args)
              break
            } else if (arg === this._helpCommandName && this._hasImplicitHelpCommand()) {
              operands.push(arg)
              if (args.length > 0) operands.push(...args)
              break
            } else if (this._defaultCommandName) {
              unknown.push(arg)
              if (args.length > 0) unknown.push(...args)
              break
            }
          }
          if (this._passThroughOptions) {
            dest.push(arg)
            if (args.length > 0) dest.push(...args)
            break
          }
          dest.push(arg)
        }
        return { operands, unknown }
      }
      opts() {
        if (this._storeOptionsAsProperties) {
          const result = {}
          const len = this.options.length
          for (let i = 0; i < len; i++) {
            const key = this.options[i].attributeName()
            result[key] = key === this._versionOptionName ? this._version : this[key]
          }
          return result
        }
        return this._optionValues
      }
      _displayError(exitCode, code, message) {
        this._outputConfiguration.outputError(
          `${message}
`,
          this._outputConfiguration.writeErr
        )
        if (typeof this._showHelpAfterError === 'string') {
          this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`)
        } else if (this._showHelpAfterError) {
          this._outputConfiguration.writeErr('\n')
          this.outputHelp({ error: true })
        }
        this._exit(exitCode, code, message)
      }
      _parseOptionsEnv() {
        this.options.forEach((option) => {
          if (option.envVar && option.envVar in process.env) {
            const optionKey = option.attributeName()
            if (
              this.getOptionValue(optionKey) === void 0 ||
              ['default', 'config', 'env'].includes(this.getOptionValueSource(optionKey))
            ) {
              if (option.required || option.optional) {
                this.emit(`optionEnv:${option.name()}`, process.env[option.envVar])
              } else {
                this.emit(`optionEnv:${option.name()}`)
              }
            }
          }
        })
      }
      missingArgument(name) {
        const message = `error: missing required argument '${name}'`
        this._displayError(1, 'commander.missingArgument', message)
      }
      optionMissingArgument(option) {
        const message = `error: option '${option.flags}' argument missing`
        this._displayError(1, 'commander.optionMissingArgument', message)
      }
      missingMandatoryOptionValue(option) {
        const message = `error: required option '${option.flags}' not specified`
        this._displayError(1, 'commander.missingMandatoryOptionValue', message)
      }
      unknownOption(flag) {
        if (this._allowUnknownOption) return
        let suggestion = ''
        if (flag.startsWith('--') && this._showSuggestionAfterError) {
          let candidateFlags = []
          let command = this
          do {
            const moreFlags = command
              .createHelp()
              .visibleOptions(command)
              .filter((option) => option.long)
              .map((option) => option.long)
            candidateFlags = candidateFlags.concat(moreFlags)
            command = command.parent
          } while (command && !command._enablePositionalOptions)
          suggestion = suggestSimilar(flag, candidateFlags)
        }
        const message = `error: unknown option '${flag}'${suggestion}`
        this._displayError(1, 'commander.unknownOption', message)
      }
      _excessArguments(receivedArgs) {
        if (this._allowExcessArguments) return
        const expected = this._args.length
        const s = expected === 1 ? '' : 's'
        const forSubcommand = this.parent ? ` for '${this.name()}'` : ''
        const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`
        this._displayError(1, 'commander.excessArguments', message)
      }
      unknownCommand() {
        const unknownName = this.args[0]
        let suggestion = ''
        if (this._showSuggestionAfterError) {
          const candidateNames = []
          this.createHelp()
            .visibleCommands(this)
            .forEach((command) => {
              candidateNames.push(command.name())
              if (command.alias()) candidateNames.push(command.alias())
            })
          suggestion = suggestSimilar(unknownName, candidateNames)
        }
        const message = `error: unknown command '${unknownName}'${suggestion}`
        this._displayError(1, 'commander.unknownCommand', message)
      }
      version(str, flags, description) {
        if (str === void 0) return this._version
        this._version = str
        flags = flags || '-V, --version'
        description = description || 'output the version number'
        const versionOption = this.createOption(flags, description)
        this._versionOptionName = versionOption.attributeName()
        this.options.push(versionOption)
        this.on('option:' + versionOption.name(), () => {
          this._outputConfiguration.writeOut(`${str}
`)
          this._exit(0, 'commander.version', str)
        })
        return this
      }
      description(str, argsDescription) {
        if (str === void 0 && argsDescription === void 0) return this._description
        this._description = str
        if (argsDescription) {
          this._argsDescription = argsDescription
        }
        return this
      }
      alias(alias) {
        if (alias === void 0) return this._aliases[0]
        let command = this
        if (
          this.commands.length !== 0 &&
          this.commands[this.commands.length - 1]._executableHandler
        ) {
          command = this.commands[this.commands.length - 1]
        }
        if (alias === command._name) throw new Error("Command alias can't be the same as its name")
        command._aliases.push(alias)
        return this
      }
      aliases(aliases) {
        if (aliases === void 0) return this._aliases
        aliases.forEach((alias) => this.alias(alias))
        return this
      }
      usage(str) {
        if (str === void 0) {
          if (this._usage) return this._usage
          const args = this._args.map((arg) => {
            return humanReadableArgName(arg)
          })
          return []
            .concat(
              this.options.length || this._hasHelpOption ? '[options]' : [],
              this.commands.length ? '[command]' : [],
              this._args.length ? args : []
            )
            .join(' ')
        }
        this._usage = str
        return this
      }
      name(str) {
        if (str === void 0) return this._name
        this._name = str
        return this
      }
      helpInformation(contextOptions) {
        const helper = this.createHelp()
        if (helper.helpWidth === void 0) {
          helper.helpWidth =
            contextOptions && contextOptions.error
              ? this._outputConfiguration.getErrHelpWidth()
              : this._outputConfiguration.getOutHelpWidth()
        }
        return helper.formatHelp(this, helper)
      }
      _getHelpContext(contextOptions) {
        contextOptions = contextOptions || {}
        const context = { error: !!contextOptions.error }
        let write
        if (context.error) {
          write = (arg) => this._outputConfiguration.writeErr(arg)
        } else {
          write = (arg) => this._outputConfiguration.writeOut(arg)
        }
        context.write = contextOptions.write || write
        context.command = this
        return context
      }
      outputHelp(contextOptions) {
        let deprecatedCallback
        if (typeof contextOptions === 'function') {
          deprecatedCallback = contextOptions
          contextOptions = void 0
        }
        const context = this._getHelpContext(contextOptions)
        getCommandAndParents(this)
          .reverse()
          .forEach((command) => command.emit('beforeAllHelp', context))
        this.emit('beforeHelp', context)
        let helpInformation = this.helpInformation(context)
        if (deprecatedCallback) {
          helpInformation = deprecatedCallback(helpInformation)
          if (typeof helpInformation !== 'string' && !Buffer.isBuffer(helpInformation)) {
            throw new Error('outputHelp callback must return a string or a Buffer')
          }
        }
        context.write(helpInformation)
        this.emit(this._helpLongFlag)
        this.emit('afterHelp', context)
        getCommandAndParents(this).forEach((command) => command.emit('afterAllHelp', context))
      }
      helpOption(flags, description) {
        if (typeof flags === 'boolean') {
          this._hasHelpOption = flags
          return this
        }
        this._helpFlags = flags || this._helpFlags
        this._helpDescription = description || this._helpDescription
        const helpFlags = splitOptionFlags(this._helpFlags)
        this._helpShortFlag = helpFlags.shortFlag
        this._helpLongFlag = helpFlags.longFlag
        return this
      }
      help(contextOptions) {
        this.outputHelp(contextOptions)
        let exitCode = process.exitCode || 0
        if (
          exitCode === 0 &&
          contextOptions &&
          typeof contextOptions !== 'function' &&
          contextOptions.error
        ) {
          exitCode = 1
        }
        this._exit(exitCode, 'commander.help', '(outputHelp)')
      }
      addHelpText(position, text) {
        const allowedValues = ['beforeAll', 'before', 'after', 'afterAll']
        if (!allowedValues.includes(position)) {
          throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`)
        }
        const helpEvent = `${position}Help`
        this.on(helpEvent, (context) => {
          let helpStr
          if (typeof text === 'function') {
            helpStr = text({ error: context.error, command: context.command })
          } else {
            helpStr = text
          }
          if (helpStr) {
            context.write(`${helpStr}
`)
          }
        })
        return this
      }
    }
    function outputHelpIfRequested(cmd, args) {
      const helpOption =
        cmd._hasHelpOption &&
        args.find((arg) => arg === cmd._helpLongFlag || arg === cmd._helpShortFlag)
      if (helpOption) {
        cmd.outputHelp()
        cmd._exit(0, 'commander.helpDisplayed', '(outputHelp)')
      }
    }
    function incrementNodeInspectorPort(args) {
      return args.map((arg) => {
        if (!arg.startsWith('--inspect')) {
          return arg
        }
        let debugOption
        let debugHost = '127.0.0.1'
        let debugPort = '9229'
        let match
        if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
          debugOption = match[1]
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
          debugOption = match[1]
          if (/^\d+$/.test(match[3])) {
            debugPort = match[3]
          } else {
            debugHost = match[3]
          }
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
          debugOption = match[1]
          debugHost = match[3]
          debugPort = match[4]
        }
        if (debugOption && debugPort !== '0') {
          return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`
        }
        return arg
      })
    }
    function getCommandAndParents(startCommand) {
      const result = []
      for (let command = startCommand; command; command = command.parent) {
        result.push(command)
      }
      return result
    }
    exports.Command = Command2
  },
})

// node_modules/commander/index.js
var require_commander = __commonJS({
  'node_modules/commander/index.js'(exports, module2) {
    var { Argument } = require_argument()
    var { Command: Command2 } = require_command()
    var { CommanderError, InvalidArgumentError } = require_error()
    var { Help } = require_help()
    var { Option } = require_option()
    exports = module2.exports = new Command2()
    exports.program = exports
    exports.Argument = Argument
    exports.Command = Command2
    exports.CommanderError = CommanderError
    exports.Help = Help
    exports.InvalidArgumentError = InvalidArgumentError
    exports.InvalidOptionArgumentError = InvalidArgumentError
    exports.Option = Option
  },
})

// node_modules/fast-glob/out/utils/array.js
var require_array = __commonJS({
  'node_modules/fast-glob/out/utils/array.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.splitWhen = exports.flatten = void 0
    function flatten(items) {
      return items.reduce((collection, item) => [].concat(collection, item), [])
    }
    exports.flatten = flatten
    function splitWhen(items, predicate) {
      const result = [[]]
      let groupIndex = 0
      for (const item of items) {
        if (predicate(item)) {
          groupIndex++
          result[groupIndex] = []
        } else {
          result[groupIndex].push(item)
        }
      }
      return result
    }
    exports.splitWhen = splitWhen
  },
})

// node_modules/fast-glob/out/utils/errno.js
var require_errno = __commonJS({
  'node_modules/fast-glob/out/utils/errno.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.isEnoentCodeError = void 0
    function isEnoentCodeError(error) {
      return error.code === 'ENOENT'
    }
    exports.isEnoentCodeError = isEnoentCodeError
  },
})

// node_modules/fast-glob/out/utils/fs.js
var require_fs = __commonJS({
  'node_modules/fast-glob/out/utils/fs.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.createDirentFromStats = void 0
    var DirentFromStats = class {
      constructor(name, stats) {
        this.name = name
        this.isBlockDevice = stats.isBlockDevice.bind(stats)
        this.isCharacterDevice = stats.isCharacterDevice.bind(stats)
        this.isDirectory = stats.isDirectory.bind(stats)
        this.isFIFO = stats.isFIFO.bind(stats)
        this.isFile = stats.isFile.bind(stats)
        this.isSocket = stats.isSocket.bind(stats)
        this.isSymbolicLink = stats.isSymbolicLink.bind(stats)
      }
    }
    function createDirentFromStats(name, stats) {
      return new DirentFromStats(name, stats)
    }
    exports.createDirentFromStats = createDirentFromStats
  },
})

// node_modules/fast-glob/out/utils/path.js
var require_path = __commonJS({
  'node_modules/fast-glob/out/utils/path.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.removeLeadingDotSegment =
      exports.escape =
      exports.makeAbsolute =
      exports.unixify =
        void 0
    var path = require('path')
    var LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2
    var UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\())/g
    function unixify(filepath) {
      return filepath.replace(/\\/g, '/')
    }
    exports.unixify = unixify
    function makeAbsolute(cwd, filepath) {
      return path.resolve(cwd, filepath)
    }
    exports.makeAbsolute = makeAbsolute
    function escape(pattern) {
      return pattern.replace(UNESCAPED_GLOB_SYMBOLS_RE, '\\$2')
    }
    exports.escape = escape
    function removeLeadingDotSegment(entry) {
      if (entry.charAt(0) === '.') {
        const secondCharactery = entry.charAt(1)
        if (secondCharactery === '/' || secondCharactery === '\\') {
          return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT)
        }
      }
      return entry
    }
    exports.removeLeadingDotSegment = removeLeadingDotSegment
  },
})

// node_modules/is-extglob/index.js
var require_is_extglob = __commonJS({
  'node_modules/is-extglob/index.js'(exports, module2) {
    module2.exports = function isExtglob(str) {
      if (typeof str !== 'string' || str === '') {
        return false
      }
      var match
      while ((match = /(\\).|([@?!+*]\(.*\))/g.exec(str))) {
        if (match[2]) return true
        str = str.slice(match.index + match[0].length)
      }
      return false
    }
  },
})

// node_modules/is-glob/index.js
var require_is_glob = __commonJS({
  'node_modules/is-glob/index.js'(exports, module2) {
    var isExtglob = require_is_extglob()
    var chars = { '{': '}', '(': ')', '[': ']' }
    var strictCheck = function (str) {
      if (str[0] === '!') {
        return true
      }
      var index = 0
      var pipeIndex = -2
      var closeSquareIndex = -2
      var closeCurlyIndex = -2
      var closeParenIndex = -2
      var backSlashIndex = -2
      while (index < str.length) {
        if (str[index] === '*') {
          return true
        }
        if (str[index + 1] === '?' && /[\].+)]/.test(str[index])) {
          return true
        }
        if (closeSquareIndex !== -1 && str[index] === '[' && str[index + 1] !== ']') {
          if (closeSquareIndex < index) {
            closeSquareIndex = str.indexOf(']', index)
          }
          if (closeSquareIndex > index) {
            if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
              return true
            }
            backSlashIndex = str.indexOf('\\', index)
            if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
              return true
            }
          }
        }
        if (closeCurlyIndex !== -1 && str[index] === '{' && str[index + 1] !== '}') {
          closeCurlyIndex = str.indexOf('}', index)
          if (closeCurlyIndex > index) {
            backSlashIndex = str.indexOf('\\', index)
            if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
              return true
            }
          }
        }
        if (
          closeParenIndex !== -1 &&
          str[index] === '(' &&
          str[index + 1] === '?' &&
          /[:!=]/.test(str[index + 2]) &&
          str[index + 3] !== ')'
        ) {
          closeParenIndex = str.indexOf(')', index)
          if (closeParenIndex > index) {
            backSlashIndex = str.indexOf('\\', index)
            if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
              return true
            }
          }
        }
        if (pipeIndex !== -1 && str[index] === '(' && str[index + 1] !== '|') {
          if (pipeIndex < index) {
            pipeIndex = str.indexOf('|', index)
          }
          if (pipeIndex !== -1 && str[pipeIndex + 1] !== ')') {
            closeParenIndex = str.indexOf(')', pipeIndex)
            if (closeParenIndex > pipeIndex) {
              backSlashIndex = str.indexOf('\\', pipeIndex)
              if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
                return true
              }
            }
          }
        }
        if (str[index] === '\\') {
          var open = str[index + 1]
          index += 2
          var close = chars[open]
          if (close) {
            var n = str.indexOf(close, index)
            if (n !== -1) {
              index = n + 1
            }
          }
          if (str[index] === '!') {
            return true
          }
        } else {
          index++
        }
      }
      return false
    }
    var relaxedCheck = function (str) {
      if (str[0] === '!') {
        return true
      }
      var index = 0
      while (index < str.length) {
        if (/[*?{}()[\]]/.test(str[index])) {
          return true
        }
        if (str[index] === '\\') {
          var open = str[index + 1]
          index += 2
          var close = chars[open]
          if (close) {
            var n = str.indexOf(close, index)
            if (n !== -1) {
              index = n + 1
            }
          }
          if (str[index] === '!') {
            return true
          }
        } else {
          index++
        }
      }
      return false
    }
    module2.exports = function isGlob(str, options) {
      if (typeof str !== 'string' || str === '') {
        return false
      }
      if (isExtglob(str)) {
        return true
      }
      var check = strictCheck
      if (options && options.strict === false) {
        check = relaxedCheck
      }
      return check(str)
    }
  },
})

// node_modules/fast-glob/node_modules/glob-parent/index.js
var require_glob_parent = __commonJS({
  'node_modules/fast-glob/node_modules/glob-parent/index.js'(exports, module2) {
    'use strict'
    var isGlob = require_is_glob()
    var pathPosixDirname = require('path').posix.dirname
    var isWin32 = require('os').platform() === 'win32'
    var slash = '/'
    var backslash = /\\/g
    var enclosure = /[\{\[].*[\}\]]$/
    var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/
    var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g
    module2.exports = function globParent(str, opts) {
      var options = Object.assign({ flipBackslashes: true }, opts)
      if (options.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
        str = str.replace(backslash, slash)
      }
      if (enclosure.test(str)) {
        str += slash
      }
      str += 'a'
      do {
        str = pathPosixDirname(str)
      } while (isGlob(str) || globby.test(str))
      return str.replace(escaped, '$1')
    }
  },
})

// node_modules/braces/lib/utils.js
var require_utils = __commonJS({
  'node_modules/braces/lib/utils.js'(exports) {
    'use strict'
    exports.isInteger = (num) => {
      if (typeof num === 'number') {
        return Number.isInteger(num)
      }
      if (typeof num === 'string' && num.trim() !== '') {
        return Number.isInteger(Number(num))
      }
      return false
    }
    exports.find = (node, type) => node.nodes.find((node2) => node2.type === type)
    exports.exceedsLimit = (min, max, step = 1, limit) => {
      if (limit === false) return false
      if (!exports.isInteger(min) || !exports.isInteger(max)) return false
      return (Number(max) - Number(min)) / Number(step) >= limit
    }
    exports.escapeNode = (block, n = 0, type) => {
      let node = block.nodes[n]
      if (!node) return
      if ((type && node.type === type) || node.type === 'open' || node.type === 'close') {
        if (node.escaped !== true) {
          node.value = '\\' + node.value
          node.escaped = true
        }
      }
    }
    exports.encloseBrace = (node) => {
      if (node.type !== 'brace') return false
      if ((node.commas >> (0 + node.ranges)) >> 0 === 0) {
        node.invalid = true
        return true
      }
      return false
    }
    exports.isInvalidBrace = (block) => {
      if (block.type !== 'brace') return false
      if (block.invalid === true || block.dollar) return true
      if ((block.commas >> (0 + block.ranges)) >> 0 === 0) {
        block.invalid = true
        return true
      }
      if (block.open !== true || block.close !== true) {
        block.invalid = true
        return true
      }
      return false
    }
    exports.isOpenOrClose = (node) => {
      if (node.type === 'open' || node.type === 'close') {
        return true
      }
      return node.open === true || node.close === true
    }
    exports.reduce = (nodes) =>
      nodes.reduce((acc, node) => {
        if (node.type === 'text') acc.push(node.value)
        if (node.type === 'range') node.type = 'text'
        return acc
      }, [])
    exports.flatten = (...args) => {
      const result = []
      const flat = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          let ele = arr[i]
          Array.isArray(ele) ? flat(ele, result) : ele !== void 0 && result.push(ele)
        }
        return result
      }
      flat(args)
      return result
    }
  },
})

// node_modules/braces/lib/stringify.js
var require_stringify = __commonJS({
  'node_modules/braces/lib/stringify.js'(exports, module2) {
    'use strict'
    var utils = require_utils()
    module2.exports = (ast, options = {}) => {
      let stringify = (node, parent = {}) => {
        let invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent)
        let invalidNode = node.invalid === true && options.escapeInvalid === true
        let output = ''
        if (node.value) {
          if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
            return '\\' + node.value
          }
          return node.value
        }
        if (node.value) {
          return node.value
        }
        if (node.nodes) {
          for (let child of node.nodes) {
            output += stringify(child)
          }
        }
        return output
      }
      return stringify(ast)
    }
  },
})

// node_modules/is-number/index.js
var require_is_number = __commonJS({
  'node_modules/is-number/index.js'(exports, module2) {
    'use strict'
    module2.exports = function (num) {
      if (typeof num === 'number') {
        return num - num === 0
      }
      if (typeof num === 'string' && num.trim() !== '') {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num)
      }
      return false
    }
  },
})

// node_modules/to-regex-range/index.js
var require_to_regex_range = __commonJS({
  'node_modules/to-regex-range/index.js'(exports, module2) {
    'use strict'
    var isNumber = require_is_number()
    var toRegexRange = (min, max, options) => {
      if (isNumber(min) === false) {
        throw new TypeError('toRegexRange: expected the first argument to be a number')
      }
      if (max === void 0 || min === max) {
        return String(min)
      }
      if (isNumber(max) === false) {
        throw new TypeError('toRegexRange: expected the second argument to be a number.')
      }
      let opts = { relaxZeros: true, ...options }
      if (typeof opts.strictZeros === 'boolean') {
        opts.relaxZeros = opts.strictZeros === false
      }
      let relax = String(opts.relaxZeros)
      let shorthand = String(opts.shorthand)
      let capture = String(opts.capture)
      let wrap = String(opts.wrap)
      let cacheKey = min + ':' + max + '=' + relax + shorthand + capture + wrap
      if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
        return toRegexRange.cache[cacheKey].result
      }
      let a = Math.min(min, max)
      let b = Math.max(min, max)
      if (Math.abs(a - b) === 1) {
        let result = min + '|' + max
        if (opts.capture) {
          return `(${result})`
        }
        if (opts.wrap === false) {
          return result
        }
        return `(?:${result})`
      }
      let isPadded = hasPadding(min) || hasPadding(max)
      let state = { min, max, a, b }
      let positives = []
      let negatives = []
      if (isPadded) {
        state.isPadded = isPadded
        state.maxLen = String(state.max).length
      }
      if (a < 0) {
        let newMin = b < 0 ? Math.abs(b) : 1
        negatives = splitToPatterns(newMin, Math.abs(a), state, opts)
        a = state.a = 0
      }
      if (b >= 0) {
        positives = splitToPatterns(a, b, state, opts)
      }
      state.negatives = negatives
      state.positives = positives
      state.result = collatePatterns(negatives, positives, opts)
      if (opts.capture === true) {
        state.result = `(${state.result})`
      } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
        state.result = `(?:${state.result})`
      }
      toRegexRange.cache[cacheKey] = state
      return state.result
    }
    function collatePatterns(neg, pos, options) {
      let onlyNegative = filterPatterns(neg, pos, '-', false, options) || []
      let onlyPositive = filterPatterns(pos, neg, '', false, options) || []
      let intersected = filterPatterns(neg, pos, '-?', true, options) || []
      let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive)
      return subpatterns.join('|')
    }
    function splitToRanges(min, max) {
      let nines = 1
      let zeros = 1
      let stop = countNines(min, nines)
      let stops = /* @__PURE__ */ new Set([max])
      while (min <= stop && stop <= max) {
        stops.add(stop)
        nines += 1
        stop = countNines(min, nines)
      }
      stop = countZeros(max + 1, zeros) - 1
      while (min < stop && stop <= max) {
        stops.add(stop)
        zeros += 1
        stop = countZeros(max + 1, zeros) - 1
      }
      stops = [...stops]
      stops.sort(compare)
      return stops
    }
    function rangeToPattern(start, stop, options) {
      if (start === stop) {
        return { pattern: start, count: [], digits: 0 }
      }
      let zipped = zip(start, stop)
      let digits = zipped.length
      let pattern = ''
      let count = 0
      for (let i = 0; i < digits; i++) {
        let [startDigit, stopDigit] = zipped[i]
        if (startDigit === stopDigit) {
          pattern += startDigit
        } else if (startDigit !== '0' || stopDigit !== '9') {
          pattern += toCharacterClass(startDigit, stopDigit, options)
        } else {
          count++
        }
      }
      if (count) {
        pattern += options.shorthand === true ? '\\d' : '[0-9]'
      }
      return { pattern, count: [count], digits }
    }
    function splitToPatterns(min, max, tok, options) {
      let ranges = splitToRanges(min, max)
      let tokens = []
      let start = min
      let prev
      for (let i = 0; i < ranges.length; i++) {
        let max2 = ranges[i]
        let obj = rangeToPattern(String(start), String(max2), options)
        let zeros = ''
        if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
          if (prev.count.length > 1) {
            prev.count.pop()
          }
          prev.count.push(obj.count[0])
          prev.string = prev.pattern + toQuantifier(prev.count)
          start = max2 + 1
          continue
        }
        if (tok.isPadded) {
          zeros = padZeros(max2, tok, options)
        }
        obj.string = zeros + obj.pattern + toQuantifier(obj.count)
        tokens.push(obj)
        start = max2 + 1
        prev = obj
      }
      return tokens
    }
    function filterPatterns(arr, comparison, prefix, intersection, options) {
      let result = []
      for (let ele of arr) {
        let { string } = ele
        if (!intersection && !contains(comparison, 'string', string)) {
          result.push(prefix + string)
        }
        if (intersection && contains(comparison, 'string', string)) {
          result.push(prefix + string)
        }
      }
      return result
    }
    function zip(a, b) {
      let arr = []
      for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]])
      return arr
    }
    function compare(a, b) {
      return a > b ? 1 : b > a ? -1 : 0
    }
    function contains(arr, key, val) {
      return arr.some((ele) => ele[key] === val)
    }
    function countNines(min, len) {
      return Number(String(min).slice(0, -len) + '9'.repeat(len))
    }
    function countZeros(integer, zeros) {
      return integer - (integer % Math.pow(10, zeros))
    }
    function toQuantifier(digits) {
      let [start = 0, stop = ''] = digits
      if (stop || start > 1) {
        return `{${start + (stop ? ',' + stop : '')}}`
      }
      return ''
    }
    function toCharacterClass(a, b, options) {
      return `[${a}${b - a === 1 ? '' : '-'}${b}]`
    }
    function hasPadding(str) {
      return /^-?(0+)\d/.test(str)
    }
    function padZeros(value, tok, options) {
      if (!tok.isPadded) {
        return value
      }
      let diff = Math.abs(tok.maxLen - String(value).length)
      let relax = options.relaxZeros !== false
      switch (diff) {
        case 0:
          return ''
        case 1:
          return relax ? '0?' : '0'
        case 2:
          return relax ? '0{0,2}' : '00'
        default: {
          return relax ? `0{0,${diff}}` : `0{${diff}}`
        }
      }
    }
    toRegexRange.cache = {}
    toRegexRange.clearCache = () => (toRegexRange.cache = {})
    module2.exports = toRegexRange
  },
})

// node_modules/fill-range/index.js
var require_fill_range = __commonJS({
  'node_modules/fill-range/index.js'(exports, module2) {
    'use strict'
    var util = require('util')
    var toRegexRange = require_to_regex_range()
    var isObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val)
    var transform = (toNumber) => {
      return (value) => (toNumber === true ? Number(value) : String(value))
    }
    var isValidValue = (value) => {
      return typeof value === 'number' || (typeof value === 'string' && value !== '')
    }
    var isNumber = (num) => Number.isInteger(+num)
    var zeros = (input) => {
      let value = `${input}`
      let index = -1
      if (value[0] === '-') value = value.slice(1)
      if (value === '0') return false
      while (value[++index] === '0');
      return index > 0
    }
    var stringify = (start, end, options) => {
      if (typeof start === 'string' || typeof end === 'string') {
        return true
      }
      return options.stringify === true
    }
    var pad = (input, maxLength, toNumber) => {
      if (maxLength > 0) {
        let dash = input[0] === '-' ? '-' : ''
        if (dash) input = input.slice(1)
        input = dash + input.padStart(dash ? maxLength - 1 : maxLength, '0')
      }
      if (toNumber === false) {
        return String(input)
      }
      return input
    }
    var toMaxLen = (input, maxLength) => {
      let negative = input[0] === '-' ? '-' : ''
      if (negative) {
        input = input.slice(1)
        maxLength--
      }
      while (input.length < maxLength) input = '0' + input
      return negative ? '-' + input : input
    }
    var toSequence = (parts, options) => {
      parts.negatives.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
      parts.positives.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
      let prefix = options.capture ? '' : '?:'
      let positives = ''
      let negatives = ''
      let result
      if (parts.positives.length) {
        positives = parts.positives.join('|')
      }
      if (parts.negatives.length) {
        negatives = `-(${prefix}${parts.negatives.join('|')})`
      }
      if (positives && negatives) {
        result = `${positives}|${negatives}`
      } else {
        result = positives || negatives
      }
      if (options.wrap) {
        return `(${prefix}${result})`
      }
      return result
    }
    var toRange = (a, b, isNumbers, options) => {
      if (isNumbers) {
        return toRegexRange(a, b, { wrap: false, ...options })
      }
      let start = String.fromCharCode(a)
      if (a === b) return start
      let stop = String.fromCharCode(b)
      return `[${start}-${stop}]`
    }
    var toRegex = (start, end, options) => {
      if (Array.isArray(start)) {
        let wrap = options.wrap === true
        let prefix = options.capture ? '' : '?:'
        return wrap ? `(${prefix}${start.join('|')})` : start.join('|')
      }
      return toRegexRange(start, end, options)
    }
    var rangeError = (...args) => {
      return new RangeError('Invalid range arguments: ' + util.inspect(...args))
    }
    var invalidRange = (start, end, options) => {
      if (options.strictRanges === true) throw rangeError([start, end])
      return []
    }
    var invalidStep = (step, options) => {
      if (options.strictRanges === true) {
        throw new TypeError(`Expected step "${step}" to be a number`)
      }
      return []
    }
    var fillNumbers = (start, end, step = 1, options = {}) => {
      let a = Number(start)
      let b = Number(end)
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        if (options.strictRanges === true) throw rangeError([start, end])
        return []
      }
      if (a === 0) a = 0
      if (b === 0) b = 0
      let descending = a > b
      let startString = String(start)
      let endString = String(end)
      let stepString = String(step)
      step = Math.max(Math.abs(step), 1)
      let padded = zeros(startString) || zeros(endString) || zeros(stepString)
      let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0
      let toNumber = padded === false && stringify(start, end, options) === false
      let format = options.transform || transform(toNumber)
      if (options.toRegex && step === 1) {
        return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options)
      }
      let parts = { negatives: [], positives: [] }
      let push = (num) => parts[num < 0 ? 'negatives' : 'positives'].push(Math.abs(num))
      let range = []
      let index = 0
      while (descending ? a >= b : a <= b) {
        if (options.toRegex === true && step > 1) {
          push(a)
        } else {
          range.push(pad(format(a, index), maxLen, toNumber))
        }
        a = descending ? a - step : a + step
        index++
      }
      if (options.toRegex === true) {
        return step > 1
          ? toSequence(parts, options)
          : toRegex(range, null, { wrap: false, ...options })
      }
      return range
    }
    var fillLetters = (start, end, step = 1, options = {}) => {
      if ((!isNumber(start) && start.length > 1) || (!isNumber(end) && end.length > 1)) {
        return invalidRange(start, end, options)
      }
      let format = options.transform || ((val) => String.fromCharCode(val))
      let a = `${start}`.charCodeAt(0)
      let b = `${end}`.charCodeAt(0)
      let descending = a > b
      let min = Math.min(a, b)
      let max = Math.max(a, b)
      if (options.toRegex && step === 1) {
        return toRange(min, max, false, options)
      }
      let range = []
      let index = 0
      while (descending ? a >= b : a <= b) {
        range.push(format(a, index))
        a = descending ? a - step : a + step
        index++
      }
      if (options.toRegex === true) {
        return toRegex(range, null, { wrap: false, options })
      }
      return range
    }
    var fill = (start, end, step, options = {}) => {
      if (end == null && isValidValue(start)) {
        return [start]
      }
      if (!isValidValue(start) || !isValidValue(end)) {
        return invalidRange(start, end, options)
      }
      if (typeof step === 'function') {
        return fill(start, end, 1, { transform: step })
      }
      if (isObject(step)) {
        return fill(start, end, 0, step)
      }
      let opts = { ...options }
      if (opts.capture === true) opts.wrap = true
      step = step || opts.step || 1
      if (!isNumber(step)) {
        if (step != null && !isObject(step)) return invalidStep(step, opts)
        return fill(start, end, 1, step)
      }
      if (isNumber(start) && isNumber(end)) {
        return fillNumbers(start, end, step, opts)
      }
      return fillLetters(start, end, Math.max(Math.abs(step), 1), opts)
    }
    module2.exports = fill
  },
})

// node_modules/braces/lib/compile.js
var require_compile = __commonJS({
  'node_modules/braces/lib/compile.js'(exports, module2) {
    'use strict'
    var fill = require_fill_range()
    var utils = require_utils()
    var compile = (ast, options = {}) => {
      let walk = (node, parent = {}) => {
        let invalidBlock = utils.isInvalidBrace(parent)
        let invalidNode = node.invalid === true && options.escapeInvalid === true
        let invalid = invalidBlock === true || invalidNode === true
        let prefix = options.escapeInvalid === true ? '\\' : ''
        let output = ''
        if (node.isOpen === true) {
          return prefix + node.value
        }
        if (node.isClose === true) {
          return prefix + node.value
        }
        if (node.type === 'open') {
          return invalid ? prefix + node.value : '('
        }
        if (node.type === 'close') {
          return invalid ? prefix + node.value : ')'
        }
        if (node.type === 'comma') {
          return node.prev.type === 'comma' ? '' : invalid ? node.value : '|'
        }
        if (node.value) {
          return node.value
        }
        if (node.nodes && node.ranges > 0) {
          let args = utils.reduce(node.nodes)
          let range = fill(...args, { ...options, wrap: false, toRegex: true })
          if (range.length !== 0) {
            return args.length > 1 && range.length > 1 ? `(${range})` : range
          }
        }
        if (node.nodes) {
          for (let child of node.nodes) {
            output += walk(child, node)
          }
        }
        return output
      }
      return walk(ast)
    }
    module2.exports = compile
  },
})

// node_modules/braces/lib/expand.js
var require_expand = __commonJS({
  'node_modules/braces/lib/expand.js'(exports, module2) {
    'use strict'
    var fill = require_fill_range()
    var stringify = require_stringify()
    var utils = require_utils()
    var append = (queue = '', stash = '', enclose = false) => {
      let result = []
      queue = [].concat(queue)
      stash = [].concat(stash)
      if (!stash.length) return queue
      if (!queue.length) {
        return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash
      }
      for (let item of queue) {
        if (Array.isArray(item)) {
          for (let value of item) {
            result.push(append(value, stash, enclose))
          }
        } else {
          for (let ele of stash) {
            if (enclose === true && typeof ele === 'string') ele = `{${ele}}`
            result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele)
          }
        }
      }
      return utils.flatten(result)
    }
    var expand = (ast, options = {}) => {
      let rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit
      let walk = (node, parent = {}) => {
        node.queue = []
        let p = parent
        let q = parent.queue
        while (p.type !== 'brace' && p.type !== 'root' && p.parent) {
          p = p.parent
          q = p.queue
        }
        if (node.invalid || node.dollar) {
          q.push(append(q.pop(), stringify(node, options)))
          return
        }
        if (node.type === 'brace' && node.invalid !== true && node.nodes.length === 2) {
          q.push(append(q.pop(), ['{}']))
          return
        }
        if (node.nodes && node.ranges > 0) {
          let args = utils.reduce(node.nodes)
          if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
            throw new RangeError(
              'expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.'
            )
          }
          let range = fill(...args, options)
          if (range.length === 0) {
            range = stringify(node, options)
          }
          q.push(append(q.pop(), range))
          node.nodes = []
          return
        }
        let enclose = utils.encloseBrace(node)
        let queue = node.queue
        let block = node
        while (block.type !== 'brace' && block.type !== 'root' && block.parent) {
          block = block.parent
          queue = block.queue
        }
        for (let i = 0; i < node.nodes.length; i++) {
          let child = node.nodes[i]
          if (child.type === 'comma' && node.type === 'brace') {
            if (i === 1) queue.push('')
            queue.push('')
            continue
          }
          if (child.type === 'close') {
            q.push(append(q.pop(), queue, enclose))
            continue
          }
          if (child.value && child.type !== 'open') {
            queue.push(append(queue.pop(), child.value))
            continue
          }
          if (child.nodes) {
            walk(child, node)
          }
        }
        return queue
      }
      return utils.flatten(walk(ast))
    }
    module2.exports = expand
  },
})

// node_modules/braces/lib/constants.js
var require_constants = __commonJS({
  'node_modules/braces/lib/constants.js'(exports, module2) {
    'use strict'
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      CHAR_0: '0',
      CHAR_9: '9',
      CHAR_UPPERCASE_A: 'A',
      CHAR_LOWERCASE_A: 'a',
      CHAR_UPPERCASE_Z: 'Z',
      CHAR_LOWERCASE_Z: 'z',
      CHAR_LEFT_PARENTHESES: '(',
      CHAR_RIGHT_PARENTHESES: ')',
      CHAR_ASTERISK: '*',
      CHAR_AMPERSAND: '&',
      CHAR_AT: '@',
      CHAR_BACKSLASH: '\\',
      CHAR_BACKTICK: '`',
      CHAR_CARRIAGE_RETURN: '\r',
      CHAR_CIRCUMFLEX_ACCENT: '^',
      CHAR_COLON: ':',
      CHAR_COMMA: ',',
      CHAR_DOLLAR: '$',
      CHAR_DOT: '.',
      CHAR_DOUBLE_QUOTE: '"',
      CHAR_EQUAL: '=',
      CHAR_EXCLAMATION_MARK: '!',
      CHAR_FORM_FEED: '\f',
      CHAR_FORWARD_SLASH: '/',
      CHAR_HASH: '#',
      CHAR_HYPHEN_MINUS: '-',
      CHAR_LEFT_ANGLE_BRACKET: '<',
      CHAR_LEFT_CURLY_BRACE: '{',
      CHAR_LEFT_SQUARE_BRACKET: '[',
      CHAR_LINE_FEED: '\n',
      CHAR_NO_BREAK_SPACE: '\xA0',
      CHAR_PERCENT: '%',
      CHAR_PLUS: '+',
      CHAR_QUESTION_MARK: '?',
      CHAR_RIGHT_ANGLE_BRACKET: '>',
      CHAR_RIGHT_CURLY_BRACE: '}',
      CHAR_RIGHT_SQUARE_BRACKET: ']',
      CHAR_SEMICOLON: ';',
      CHAR_SINGLE_QUOTE: "'",
      CHAR_SPACE: ' ',
      CHAR_TAB: '	',
      CHAR_UNDERSCORE: '_',
      CHAR_VERTICAL_LINE: '|',
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: '\uFEFF',
    }
  },
})

// node_modules/braces/lib/parse.js
var require_parse = __commonJS({
  'node_modules/braces/lib/parse.js'(exports, module2) {
    'use strict'
    var stringify = require_stringify()
    var {
      MAX_LENGTH,
      CHAR_BACKSLASH,
      CHAR_BACKTICK,
      CHAR_COMMA,
      CHAR_DOT,
      CHAR_LEFT_PARENTHESES,
      CHAR_RIGHT_PARENTHESES,
      CHAR_LEFT_CURLY_BRACE,
      CHAR_RIGHT_CURLY_BRACE,
      CHAR_LEFT_SQUARE_BRACKET,
      CHAR_RIGHT_SQUARE_BRACKET,
      CHAR_DOUBLE_QUOTE,
      CHAR_SINGLE_QUOTE,
      CHAR_NO_BREAK_SPACE,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE,
    } = require_constants()
    var parse = (input, options = {}) => {
      if (typeof input !== 'string') {
        throw new TypeError('Expected a string')
      }
      let opts = options || {}
      let max =
        typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH
      if (input.length > max) {
        throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`)
      }
      let ast = { type: 'root', input, nodes: [] }
      let stack = [ast]
      let block = ast
      let prev = ast
      let brackets = 0
      let length = input.length
      let index = 0
      let depth = 0
      let value
      let memo = {}
      const advance = () => input[index++]
      const push = (node) => {
        if (node.type === 'text' && prev.type === 'dot') {
          prev.type = 'text'
        }
        if (prev && prev.type === 'text' && node.type === 'text') {
          prev.value += node.value
          return
        }
        block.nodes.push(node)
        node.parent = block
        node.prev = prev
        prev = node
        return node
      }
      push({ type: 'bos' })
      while (index < length) {
        block = stack[stack.length - 1]
        value = advance()
        if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
          continue
        }
        if (value === CHAR_BACKSLASH) {
          push({ type: 'text', value: (options.keepEscaping ? value : '') + advance() })
          continue
        }
        if (value === CHAR_RIGHT_SQUARE_BRACKET) {
          push({ type: 'text', value: '\\' + value })
          continue
        }
        if (value === CHAR_LEFT_SQUARE_BRACKET) {
          brackets++
          let closed = true
          let next
          while (index < length && (next = advance())) {
            value += next
            if (next === CHAR_LEFT_SQUARE_BRACKET) {
              brackets++
              continue
            }
            if (next === CHAR_BACKSLASH) {
              value += advance()
              continue
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              brackets--
              if (brackets === 0) {
                break
              }
            }
          }
          push({ type: 'text', value })
          continue
        }
        if (value === CHAR_LEFT_PARENTHESES) {
          block = push({ type: 'paren', nodes: [] })
          stack.push(block)
          push({ type: 'text', value })
          continue
        }
        if (value === CHAR_RIGHT_PARENTHESES) {
          if (block.type !== 'paren') {
            push({ type: 'text', value })
            continue
          }
          block = stack.pop()
          push({ type: 'text', value })
          block = stack[stack.length - 1]
          continue
        }
        if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
          let open = value
          let next
          if (options.keepQuotes !== true) {
            value = ''
          }
          while (index < length && (next = advance())) {
            if (next === CHAR_BACKSLASH) {
              value += next + advance()
              continue
            }
            if (next === open) {
              if (options.keepQuotes === true) value += next
              break
            }
            value += next
          }
          push({ type: 'text', value })
          continue
        }
        if (value === CHAR_LEFT_CURLY_BRACE) {
          depth++
          let dollar = (prev.value && prev.value.slice(-1) === '$') || block.dollar === true
          let brace = {
            type: 'brace',
            open: true,
            close: false,
            dollar,
            depth,
            commas: 0,
            ranges: 0,
            nodes: [],
          }
          block = push(brace)
          stack.push(block)
          push({ type: 'open', value })
          continue
        }
        if (value === CHAR_RIGHT_CURLY_BRACE) {
          if (block.type !== 'brace') {
            push({ type: 'text', value })
            continue
          }
          let type = 'close'
          block = stack.pop()
          block.close = true
          push({ type, value })
          depth--
          block = stack[stack.length - 1]
          continue
        }
        if (value === CHAR_COMMA && depth > 0) {
          if (block.ranges > 0) {
            block.ranges = 0
            let open = block.nodes.shift()
            block.nodes = [open, { type: 'text', value: stringify(block) }]
          }
          push({ type: 'comma', value })
          block.commas++
          continue
        }
        if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
          let siblings = block.nodes
          if (depth === 0 || siblings.length === 0) {
            push({ type: 'text', value })
            continue
          }
          if (prev.type === 'dot') {
            block.range = []
            prev.value += value
            prev.type = 'range'
            if (block.nodes.length !== 3 && block.nodes.length !== 5) {
              block.invalid = true
              block.ranges = 0
              prev.type = 'text'
              continue
            }
            block.ranges++
            block.args = []
            continue
          }
          if (prev.type === 'range') {
            siblings.pop()
            let before = siblings[siblings.length - 1]
            before.value += prev.value + value
            prev = before
            block.ranges--
            continue
          }
          push({ type: 'dot', value })
          continue
        }
        push({ type: 'text', value })
      }
      do {
        block = stack.pop()
        if (block.type !== 'root') {
          block.nodes.forEach((node) => {
            if (!node.nodes) {
              if (node.type === 'open') node.isOpen = true
              if (node.type === 'close') node.isClose = true
              if (!node.nodes) node.type = 'text'
              node.invalid = true
            }
          })
          let parent = stack[stack.length - 1]
          let index2 = parent.nodes.indexOf(block)
          parent.nodes.splice(index2, 1, ...block.nodes)
        }
      } while (stack.length > 0)
      push({ type: 'eos' })
      return ast
    }
    module2.exports = parse
  },
})

// node_modules/braces/index.js
var require_braces = __commonJS({
  'node_modules/braces/index.js'(exports, module2) {
    'use strict'
    var stringify = require_stringify()
    var compile = require_compile()
    var expand = require_expand()
    var parse = require_parse()
    var braces = (input, options = {}) => {
      let output = []
      if (Array.isArray(input)) {
        for (let pattern of input) {
          let result = braces.create(pattern, options)
          if (Array.isArray(result)) {
            output.push(...result)
          } else {
            output.push(result)
          }
        }
      } else {
        output = [].concat(braces.create(input, options))
      }
      if (options && options.expand === true && options.nodupes === true) {
        output = [...new Set(output)]
      }
      return output
    }
    braces.parse = (input, options = {}) => parse(input, options)
    braces.stringify = (input, options = {}) => {
      if (typeof input === 'string') {
        return stringify(braces.parse(input, options), options)
      }
      return stringify(input, options)
    }
    braces.compile = (input, options = {}) => {
      if (typeof input === 'string') {
        input = braces.parse(input, options)
      }
      return compile(input, options)
    }
    braces.expand = (input, options = {}) => {
      if (typeof input === 'string') {
        input = braces.parse(input, options)
      }
      let result = expand(input, options)
      if (options.noempty === true) {
        result = result.filter(Boolean)
      }
      if (options.nodupes === true) {
        result = [...new Set(result)]
      }
      return result
    }
    braces.create = (input, options = {}) => {
      if (input === '' || input.length < 3) {
        return [input]
      }
      return options.expand !== true
        ? braces.compile(input, options)
        : braces.expand(input, options)
    }
    module2.exports = braces
  },
})

// node_modules/picomatch/lib/constants.js
var require_constants2 = __commonJS({
  'node_modules/picomatch/lib/constants.js'(exports, module2) {
    'use strict'
    var path = require('path')
    var WIN_SLASH = '\\\\/'
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`
    var DOT_LITERAL = '\\.'
    var PLUS_LITERAL = '\\+'
    var QMARK_LITERAL = '\\?'
    var SLASH_LITERAL = '\\/'
    var ONE_CHAR = '(?=.)'
    var QMARK = '[^/]'
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`
    var NO_DOT = `(?!${DOT_LITERAL})`
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`
    var STAR = `${QMARK}*?`
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR,
    }
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`,
    }
    var POSIX_REGEX_SOURCE = {
      alnum: 'a-zA-Z0-9',
      alpha: 'a-zA-Z',
      ascii: '\\x00-\\x7F',
      blank: ' \\t',
      cntrl: '\\x00-\\x1F\\x7F',
      digit: '0-9',
      graph: '\\x21-\\x7E',
      lower: 'a-z',
      print: '\\x20-\\x7E ',
      punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
      space: ' \\t\\r\\n\\v\\f',
      upper: 'A-Z',
      word: 'A-Za-z0-9_',
      xdigit: 'A-Fa-f0-9',
    }
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      REPLACEMENTS: {
        '***': '*',
        '**/**': '**',
        '**/**/**': '**',
      },
      CHAR_0: 48,
      CHAR_9: 57,
      CHAR_UPPERCASE_A: 65,
      CHAR_LOWERCASE_A: 97,
      CHAR_UPPERCASE_Z: 90,
      CHAR_LOWERCASE_Z: 122,
      CHAR_LEFT_PARENTHESES: 40,
      CHAR_RIGHT_PARENTHESES: 41,
      CHAR_ASTERISK: 42,
      CHAR_AMPERSAND: 38,
      CHAR_AT: 64,
      CHAR_BACKWARD_SLASH: 92,
      CHAR_CARRIAGE_RETURN: 13,
      CHAR_CIRCUMFLEX_ACCENT: 94,
      CHAR_COLON: 58,
      CHAR_COMMA: 44,
      CHAR_DOT: 46,
      CHAR_DOUBLE_QUOTE: 34,
      CHAR_EQUAL: 61,
      CHAR_EXCLAMATION_MARK: 33,
      CHAR_FORM_FEED: 12,
      CHAR_FORWARD_SLASH: 47,
      CHAR_GRAVE_ACCENT: 96,
      CHAR_HASH: 35,
      CHAR_HYPHEN_MINUS: 45,
      CHAR_LEFT_ANGLE_BRACKET: 60,
      CHAR_LEFT_CURLY_BRACE: 123,
      CHAR_LEFT_SQUARE_BRACKET: 91,
      CHAR_LINE_FEED: 10,
      CHAR_NO_BREAK_SPACE: 160,
      CHAR_PERCENT: 37,
      CHAR_PLUS: 43,
      CHAR_QUESTION_MARK: 63,
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      CHAR_RIGHT_CURLY_BRACE: 125,
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      CHAR_SEMICOLON: 59,
      CHAR_SINGLE_QUOTE: 39,
      CHAR_SPACE: 32,
      CHAR_TAB: 9,
      CHAR_UNDERSCORE: 95,
      CHAR_VERTICAL_LINE: 124,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      SEP: path.sep,
      extglobChars(chars) {
        return {
          '!': { type: 'negate', open: '(?:(?!(?:', close: `))${chars.STAR})` },
          '?': { type: 'qmark', open: '(?:', close: ')?' },
          '+': { type: 'plus', open: '(?:', close: ')+' },
          '*': { type: 'star', open: '(?:', close: ')*' },
          '@': { type: 'at', open: '(?:', close: ')' },
        }
      },
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS
      },
    }
  },
})

// node_modules/picomatch/lib/utils.js
var require_utils2 = __commonJS({
  'node_modules/picomatch/lib/utils.js'(exports) {
    'use strict'
    var path = require('path')
    var win32 = process.platform === 'win32'
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL,
    } = require_constants2()
    exports.isObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val)
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str)
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str)
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1')
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, '/')
    exports.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === '\\' ? '' : match
      })
    }
    exports.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split('.').map(Number)
      if ((segs.length === 3 && segs[0] >= 9) || (segs[0] === 8 && segs[1] >= 10)) {
        return true
      }
      return false
    }
    exports.isWindows = (options) => {
      if (options && typeof options.windows === 'boolean') {
        return options.windows
      }
      return win32 === true || path.sep === '\\'
    }
    exports.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx)
      if (idx === -1) return input
      if (input[idx - 1] === '\\') return exports.escapeLast(input, char, idx - 1)
      return `${input.slice(0, idx)}\\${input.slice(idx)}`
    }
    exports.removePrefix = (input, state = {}) => {
      let output = input
      if (output.startsWith('./')) {
        output = output.slice(2)
        state.prefix = './'
      }
      return output
    }
    exports.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? '' : '^'
      const append = options.contains ? '' : '$'
      let output = `${prepend}(?:${input})${append}`
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`
      }
      return output
    }
  },
})

// node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  'node_modules/picomatch/lib/scan.js'(exports, module2) {
    'use strict'
    var utils = require_utils2()
    var {
      CHAR_ASTERISK,
      CHAR_AT,
      CHAR_BACKWARD_SLASH,
      CHAR_COMMA,
      CHAR_DOT,
      CHAR_EXCLAMATION_MARK,
      CHAR_FORWARD_SLASH,
      CHAR_LEFT_CURLY_BRACE,
      CHAR_LEFT_PARENTHESES,
      CHAR_LEFT_SQUARE_BRACKET,
      CHAR_PLUS,
      CHAR_QUESTION_MARK,
      CHAR_RIGHT_CURLY_BRACE,
      CHAR_RIGHT_PARENTHESES,
      CHAR_RIGHT_SQUARE_BRACKET,
    } = require_constants2()
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH
    }
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1
      }
    }
    var scan = (input, options) => {
      const opts = options || {}
      const length = input.length - 1
      const scanToEnd = opts.parts === true || opts.scanToEnd === true
      const slashes = []
      const tokens = []
      const parts = []
      let str = input
      let index = -1
      let start = 0
      let lastIndex = 0
      let isBrace = false
      let isBracket = false
      let isGlob = false
      let isExtglob = false
      let isGlobstar = false
      let braceEscaped = false
      let backslashes = false
      let negated = false
      let negatedExtglob = false
      let finished = false
      let braces = 0
      let prev
      let code
      let token = { value: '', depth: 0, isGlob: false }
      const eos = () => index >= length
      const peek = () => str.charCodeAt(index + 1)
      const advance = () => {
        prev = code
        return str.charCodeAt(++index)
      }
      while (index < length) {
        code = advance()
        let next
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true
          code = advance()
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true
          }
          continue
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true
              advance()
              continue
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++
              continue
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true
              isGlob = token.isGlob = true
              finished = true
              if (scanToEnd === true) {
                continue
              }
              break
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true
              isGlob = token.isGlob = true
              finished = true
              if (scanToEnd === true) {
                continue
              }
              break
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--
              if (braces === 0) {
                braceEscaped = false
                isBrace = token.isBrace = true
                finished = true
                break
              }
            }
          }
          if (scanToEnd === true) {
            continue
          }
          break
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index)
          tokens.push(token)
          token = { value: '', depth: 0, isGlob: false }
          if (finished === true) continue
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2
            continue
          }
          lastIndex = index + 1
          continue
        }
        if (opts.noext !== true) {
          const isExtglobChar =
            code === CHAR_PLUS ||
            code === CHAR_AT ||
            code === CHAR_ASTERISK ||
            code === CHAR_QUESTION_MARK ||
            code === CHAR_EXCLAMATION_MARK
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true
            isExtglob = token.isExtglob = true
            finished = true
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true
                  code = advance()
                  continue
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true
                  finished = true
                  break
                }
              }
              continue
            }
            break
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true
          isGlob = token.isGlob = true
          finished = true
          if (scanToEnd === true) {
            continue
          }
          break
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true
          finished = true
          if (scanToEnd === true) {
            continue
          }
          break
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true
              advance()
              continue
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true
              isGlob = token.isGlob = true
              finished = true
              break
            }
          }
          if (scanToEnd === true) {
            continue
          }
          break
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true
          start++
          continue
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true
                code = advance()
                continue
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true
                break
              }
            }
            continue
          }
          break
        }
        if (isGlob === true) {
          finished = true
          if (scanToEnd === true) {
            continue
          }
          break
        }
      }
      if (opts.noext === true) {
        isExtglob = false
        isGlob = false
      }
      let base = str
      let prefix = ''
      let glob = ''
      if (start > 0) {
        prefix = str.slice(0, start)
        str = str.slice(start)
        lastIndex -= start
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex)
        glob = str.slice(lastIndex)
      } else if (isGlob === true) {
        base = ''
        glob = str
      } else {
        base = str
      }
      if (base && base !== '' && base !== '/' && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1)
        }
      }
      if (opts.unescape === true) {
        if (glob) glob = utils.removeBackslashes(glob)
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base)
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob,
      }
      if (opts.tokens === true) {
        state.maxDepth = 0
        if (!isPathSeparator(code)) {
          tokens.push(token)
        }
        state.tokens = tokens
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start
          const i = slashes[idx]
          const value = input.slice(n, i)
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true
              tokens[idx].value = prefix
            } else {
              tokens[idx].value = value
            }
            depth(tokens[idx])
            state.maxDepth += tokens[idx].depth
          }
          if (idx !== 0 || value !== '') {
            parts.push(value)
          }
          prevIndex = i
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1)
          parts.push(value)
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value
            depth(tokens[tokens.length - 1])
            state.maxDepth += tokens[tokens.length - 1].depth
          }
        }
        state.slashes = slashes
        state.parts = parts
      }
      return state
    }
    module2.exports = scan
  },
})

// node_modules/picomatch/lib/parse.js
var require_parse2 = __commonJS({
  'node_modules/picomatch/lib/parse.js'(exports, module2) {
    'use strict'
    var constants = require_constants2()
    var utils = require_utils2()
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS,
    } = constants
    var expandRange = (args, options) => {
      if (typeof options.expandRange === 'function') {
        return options.expandRange(...args, options)
      }
      args.sort()
      const value = `[${args.join('-')}]`
      try {
        new RegExp(value)
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join('..')
      }
      return value
    }
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`
    }
    var parse = (input, options) => {
      if (typeof input !== 'string') {
        throw new TypeError('Expected a string')
      }
      input = REPLACEMENTS[input] || input
      const opts = { ...options }
      const max =
        typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH
      let len = input.length
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`)
      }
      const bos = { type: 'bos', value: '', output: opts.prepend || '' }
      const tokens = [bos]
      const capture = opts.capture ? '' : '?:'
      const win32 = utils.isWindows(options)
      const PLATFORM_CHARS = constants.globChars(win32)
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS)
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR,
      } = PLATFORM_CHARS
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`
      }
      const nodot = opts.dot ? '' : NO_DOT
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT
      let star = opts.bash === true ? globstar(opts) : STAR
      if (opts.capture) {
        star = `(${star})`
      }
      if (typeof opts.noext === 'boolean') {
        opts.noextglob = opts.noext
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: '',
        output: '',
        prefix: '',
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens,
      }
      input = utils.removePrefix(input, state)
      len = input.length
      const extglobs = []
      const braces = []
      const stack = []
      let prev = bos
      let value
      const eos = () => state.index === len - 1
      const peek = (state.peek = (n = 1) => input[state.index + n])
      const advance = (state.advance = () => input[++state.index] || '')
      const remaining = () => input.slice(state.index + 1)
      const consume = (value2 = '', num = 0) => {
        state.consumed += value2
        state.index += num
      }
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value
        consume(token.value)
      }
      const negate = () => {
        let count = 1
        while (peek() === '!' && (peek(2) !== '(' || peek(3) === '?')) {
          advance()
          state.start++
          count++
        }
        if (count % 2 === 0) {
          return false
        }
        state.negated = true
        state.start++
        return true
      }
      const increment = (type) => {
        state[type]++
        stack.push(type)
      }
      const decrement = (type) => {
        state[type]--
        stack.pop()
      }
      const push = (tok) => {
        if (prev.type === 'globstar') {
          const isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace')
          const isExtglob =
            tok.extglob === true ||
            (extglobs.length && (tok.type === 'pipe' || tok.type === 'paren'))
          if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length)
            prev.type = 'star'
            prev.value = '*'
            prev.output = star
            state.output += prev.output
          }
        }
        if (extglobs.length && tok.type !== 'paren') {
          extglobs[extglobs.length - 1].inner += tok.value
        }
        if (tok.value || tok.output) append(tok)
        if (prev && prev.type === 'text' && tok.type === 'text') {
          prev.value += tok.value
          prev.output = (prev.output || '') + tok.value
          return
        }
        tok.prev = prev
        tokens.push(tok)
        prev = tok
      }
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: '' }
        token.prev = prev
        token.parens = state.parens
        token.output = state.output
        const output = (opts.capture ? '(' : '') + token.open
        increment('parens')
        push({ type, value: value2, output: state.output ? '' : ONE_CHAR })
        push({ type: 'paren', extglob: true, value: advance(), output })
        extglobs.push(token)
      }
      const extglobClose = (token) => {
        let output = token.close + (opts.capture ? ')' : '')
        let rest
        if (token.type === 'negate') {
          let extglobStar = star
          if (token.inner && token.inner.length > 1 && token.inner.includes('/')) {
            extglobStar = globstar(opts)
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`
          }
          if (token.inner.includes('*') && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse(rest, { ...options, fastpaths: false }).output
            output = token.close = `)${expression})${extglobStar})`
          }
          if (token.prev.type === 'bos') {
            state.negatedExtglob = true
          }
        }
        push({ type: 'paren', extglob: true, value, output })
        decrement('parens')
      }
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false
        let output = input.replace(
          REGEX_SPECIAL_CHARS_BACKREF,
          (m, esc, chars, first, rest, index) => {
            if (first === '\\') {
              backslashes = true
              return m
            }
            if (first === '?') {
              if (esc) {
                return esc + first + (rest ? QMARK.repeat(rest.length) : '')
              }
              if (index === 0) {
                return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '')
              }
              return QMARK.repeat(chars.length)
            }
            if (first === '.') {
              return DOT_LITERAL.repeat(chars.length)
            }
            if (first === '*') {
              if (esc) {
                return esc + first + (rest ? star : '')
              }
              return star
            }
            return esc ? m : `\\${m}`
          }
        )
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, '')
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? '\\\\' : m ? '\\' : ''
            })
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input
          return state
        }
        state.output = utils.wrapOutput(output, state, options)
        return state
      }
      while (!eos()) {
        value = advance()
        if (value === '\0') {
          continue
        }
        if (value === '\\') {
          const next = peek()
          if (next === '/' && opts.bash !== true) {
            continue
          }
          if (next === '.' || next === ';') {
            continue
          }
          if (!next) {
            value += '\\'
            push({ type: 'text', value })
            continue
          }
          const match = /^\\+/.exec(remaining())
          let slashes = 0
          if (match && match[0].length > 2) {
            slashes = match[0].length
            state.index += slashes
            if (slashes % 2 !== 0) {
              value += '\\'
            }
          }
          if (opts.unescape === true) {
            value = advance()
          } else {
            value += advance()
          }
          if (state.brackets === 0) {
            push({ type: 'text', value })
            continue
          }
        }
        if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
          if (opts.posix !== false && value === ':') {
            const inner = prev.value.slice(1)
            if (inner.includes('[')) {
              prev.posix = true
              if (inner.includes(':')) {
                const idx = prev.value.lastIndexOf('[')
                const pre = prev.value.slice(0, idx)
                const rest2 = prev.value.slice(idx + 2)
                const posix = POSIX_REGEX_SOURCE[rest2]
                if (posix) {
                  prev.value = pre + posix
                  state.backtrack = true
                  advance()
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR
                  }
                  continue
                }
              }
            }
          }
          if ((value === '[' && peek() !== ':') || (value === '-' && peek() === ']')) {
            value = `\\${value}`
          }
          if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
            value = `\\${value}`
          }
          if (opts.posix === true && value === '!' && prev.value === '[') {
            value = '^'
          }
          prev.value += value
          append({ value })
          continue
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value)
          prev.value += value
          append({ value })
          continue
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1
          if (opts.keepQuotes === true) {
            push({ type: 'text', value })
          }
          continue
        }
        if (value === '(') {
          increment('parens')
          push({ type: 'paren', value })
          continue
        }
        if (value === ')') {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError('opening', '('))
          }
          const extglob = extglobs[extglobs.length - 1]
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop())
            continue
          }
          push({ type: 'paren', value, output: state.parens ? ')' : '\\)' })
          decrement('parens')
          continue
        }
        if (value === '[') {
          if (opts.nobracket === true || !remaining().includes(']')) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError('closing', ']'))
            }
            value = `\\${value}`
          } else {
            increment('brackets')
          }
          push({ type: 'bracket', value })
          continue
        }
        if (value === ']') {
          if (
            opts.nobracket === true ||
            (prev && prev.type === 'bracket' && prev.value.length === 1)
          ) {
            push({ type: 'text', value, output: `\\${value}` })
            continue
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError('opening', '['))
            }
            push({ type: 'text', value, output: `\\${value}` })
            continue
          }
          decrement('brackets')
          const prevValue = prev.value.slice(1)
          if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
            value = `/${value}`
          }
          prev.value += value
          append({ value })
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue
          }
          const escaped = utils.escapeRegex(prev.value)
          state.output = state.output.slice(0, -prev.value.length)
          if (opts.literalBrackets === true) {
            state.output += escaped
            prev.value = escaped
            continue
          }
          prev.value = `(${capture}${escaped}|${prev.value})`
          state.output += prev.value
          continue
        }
        if (value === '{' && opts.nobrace !== true) {
          increment('braces')
          const open = {
            type: 'brace',
            value,
            output: '(',
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length,
          }
          braces.push(open)
          push(open)
          continue
        }
        if (value === '}') {
          const brace = braces[braces.length - 1]
          if (opts.nobrace === true || !brace) {
            push({ type: 'text', value, output: value })
            continue
          }
          let output = ')'
          if (brace.dots === true) {
            const arr = tokens.slice()
            const range = []
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop()
              if (arr[i].type === 'brace') {
                break
              }
              if (arr[i].type !== 'dots') {
                range.unshift(arr[i].value)
              }
            }
            output = expandRange(range, opts)
            state.backtrack = true
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex)
            const toks = state.tokens.slice(brace.tokensIndex)
            brace.value = brace.output = '\\{'
            value = output = '\\}'
            state.output = out
            for (const t of toks) {
              state.output += t.output || t.value
            }
          }
          push({ type: 'brace', value, output })
          decrement('braces')
          braces.pop()
          continue
        }
        if (value === '|') {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++
          }
          push({ type: 'text', value })
          continue
        }
        if (value === ',') {
          let output = value
          const brace = braces[braces.length - 1]
          if (brace && stack[stack.length - 1] === 'braces') {
            brace.comma = true
            output = '|'
          }
          push({ type: 'comma', value, output })
          continue
        }
        if (value === '/') {
          if (prev.type === 'dot' && state.index === state.start + 1) {
            state.start = state.index + 1
            state.consumed = ''
            state.output = ''
            tokens.pop()
            prev = bos
            continue
          }
          push({ type: 'slash', value, output: SLASH_LITERAL })
          continue
        }
        if (value === '.') {
          if (state.braces > 0 && prev.type === 'dot') {
            if (prev.value === '.') prev.output = DOT_LITERAL
            const brace = braces[braces.length - 1]
            prev.type = 'dots'
            prev.output += value
            prev.value += value
            brace.dots = true
            continue
          }
          if (state.braces + state.parens === 0 && prev.type !== 'bos' && prev.type !== 'slash') {
            push({ type: 'text', value, output: DOT_LITERAL })
            continue
          }
          push({ type: 'dot', value, output: DOT_LITERAL })
          continue
        }
        if (value === '?') {
          const isGroup = prev && prev.value === '('
          if (!isGroup && opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
            extglobOpen('qmark', value)
            continue
          }
          if (prev && prev.type === 'paren') {
            const next = peek()
            let output = value
            if (next === '<' && !utils.supportsLookbehinds()) {
              throw new Error('Node.js v10 or higher is required for regex lookbehinds')
            }
            if (
              (prev.value === '(' && !/[!=<:]/.test(next)) ||
              (next === '<' && !/<([!=]|\w+>)/.test(remaining()))
            ) {
              output = `\\${value}`
            }
            push({ type: 'text', value, output })
            continue
          }
          if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
            push({ type: 'qmark', value, output: QMARK_NO_DOT })
            continue
          }
          push({ type: 'qmark', value, output: QMARK })
          continue
        }
        if (value === '!') {
          if (opts.noextglob !== true && peek() === '(') {
            if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
              extglobOpen('negate', value)
              continue
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate()
            continue
          }
        }
        if (value === '+') {
          if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
            extglobOpen('plus', value)
            continue
          }
          if ((prev && prev.value === '(') || opts.regex === false) {
            push({ type: 'plus', value, output: PLUS_LITERAL })
            continue
          }
          if (
            (prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) ||
            state.parens > 0
          ) {
            push({ type: 'plus', value })
            continue
          }
          push({ type: 'plus', value: PLUS_LITERAL })
          continue
        }
        if (value === '@') {
          if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
            push({ type: 'at', extglob: true, value, output: '' })
            continue
          }
          push({ type: 'text', value })
          continue
        }
        if (value !== '*') {
          if (value === '$' || value === '^') {
            value = `\\${value}`
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining())
          if (match) {
            value += match[0]
            state.index += match[0].length
          }
          push({ type: 'text', value })
          continue
        }
        if (prev && (prev.type === 'globstar' || prev.star === true)) {
          prev.type = 'star'
          prev.star = true
          prev.value += value
          prev.output = star
          state.backtrack = true
          state.globstar = true
          consume(value)
          continue
        }
        let rest = remaining()
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen('star', value)
          continue
        }
        if (prev.type === 'star') {
          if (opts.noglobstar === true) {
            consume(value)
            continue
          }
          const prior = prev.prev
          const before = prior.prev
          const isStart = prior.type === 'slash' || prior.type === 'bos'
          const afterStar = before && (before.type === 'star' || before.type === 'globstar')
          if (opts.bash === true && (!isStart || (rest[0] && rest[0] !== '/'))) {
            push({ type: 'star', value, output: '' })
            continue
          }
          const isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace')
          const isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren')
          if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
            push({ type: 'star', value, output: '' })
            continue
          }
          while (rest.slice(0, 3) === '/**') {
            const after = input[state.index + 4]
            if (after && after !== '/') {
              break
            }
            rest = rest.slice(3)
            consume('/**', 3)
          }
          if (prior.type === 'bos' && eos()) {
            prev.type = 'globstar'
            prev.value += value
            prev.output = globstar(opts)
            state.output = prev.output
            state.globstar = true
            consume(value)
            continue
          }
          if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length)
            prior.output = `(?:${prior.output}`
            prev.type = 'globstar'
            prev.output = globstar(opts) + (opts.strictSlashes ? ')' : '|$)')
            prev.value += value
            state.globstar = true
            state.output += prior.output + prev.output
            consume(value)
            continue
          }
          if (prior.type === 'slash' && prior.prev.type !== 'bos' && rest[0] === '/') {
            const end = rest[1] !== void 0 ? '|$' : ''
            state.output = state.output.slice(0, -(prior.output + prev.output).length)
            prior.output = `(?:${prior.output}`
            prev.type = 'globstar'
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`
            prev.value += value
            state.output += prior.output + prev.output
            state.globstar = true
            consume(value + advance())
            push({ type: 'slash', value: '/', output: '' })
            continue
          }
          if (prior.type === 'bos' && rest[0] === '/') {
            prev.type = 'globstar'
            prev.value += value
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`
            state.output = prev.output
            state.globstar = true
            consume(value + advance())
            push({ type: 'slash', value: '/', output: '' })
            continue
          }
          state.output = state.output.slice(0, -prev.output.length)
          prev.type = 'globstar'
          prev.output = globstar(opts)
          prev.value += value
          state.output += prev.output
          state.globstar = true
          consume(value)
          continue
        }
        const token = { type: 'star', value, output: star }
        if (opts.bash === true) {
          token.output = '.*?'
          if (prev.type === 'bos' || prev.type === 'slash') {
            token.output = nodot + token.output
          }
          push(token)
          continue
        }
        if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
          token.output = value
          push(token)
          continue
        }
        if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
          if (prev.type === 'dot') {
            state.output += NO_DOT_SLASH
            prev.output += NO_DOT_SLASH
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH
            prev.output += NO_DOTS_SLASH
          } else {
            state.output += nodot
            prev.output += nodot
          }
          if (peek() !== '*') {
            state.output += ONE_CHAR
            prev.output += ONE_CHAR
          }
        }
        push(token)
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ']'))
        state.output = utils.escapeLast(state.output, '[')
        decrement('brackets')
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ')'))
        state.output = utils.escapeLast(state.output, '(')
        decrement('parens')
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', '}'))
        state.output = utils.escapeLast(state.output, '{')
        decrement('braces')
      }
      if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
        push({ type: 'maybe_slash', value: '', output: `${SLASH_LITERAL}?` })
      }
      if (state.backtrack === true) {
        state.output = ''
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value
          if (token.suffix) {
            state.output += token.suffix
          }
        }
      }
      return state
    }
    parse.fastpaths = (input, options) => {
      const opts = { ...options }
      const max =
        typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH
      const len = input.length
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`)
      }
      input = REPLACEMENTS[input] || input
      const win32 = utils.isWindows(options)
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR,
      } = constants.globChars(win32)
      const nodot = opts.dot ? NO_DOTS : NO_DOT
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT
      const capture = opts.capture ? '' : '?:'
      const state = { negated: false, prefix: '' }
      let star = opts.bash === true ? '.*?' : STAR
      if (opts.capture) {
        star = `(${star})`
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true) return star
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`
      }
      const create = (str) => {
        switch (str) {
          case '*':
            return `${nodot}${ONE_CHAR}${star}`
          case '.*':
            return `${DOT_LITERAL}${ONE_CHAR}${star}`
          case '*.*':
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`
          case '*/*':
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`
          case '**':
            return nodot + globstar(opts)
          case '**/*':
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`
          case '**/*.*':
            return `(?:${nodot}${globstar(
              opts
            )}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`
          case '**/.*':
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str)
            if (!match) return
            const source2 = create(match[1])
            if (!source2) return
            return source2 + DOT_LITERAL + match[2]
          }
        }
      }
      const output = utils.removePrefix(input, state)
      let source = create(output)
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`
      }
      return source
    }
    module2.exports = parse
  },
})

// node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  'node_modules/picomatch/lib/picomatch.js'(exports, module2) {
    'use strict'
    var path = require('path')
    var scan = require_scan()
    var parse = require_parse2()
    var utils = require_utils2()
    var constants = require_constants2()
    var isObject = (val) => val && typeof val === 'object' && !Array.isArray(val)
    var picomatch = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch(input, options, returnState))
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str)
            if (state2) return state2
          }
          return false
        }
        return arrayMatcher
      }
      const isState = isObject(glob) && glob.tokens && glob.input
      if (glob === '' || (typeof glob !== 'string' && !isState)) {
        throw new TypeError('Expected pattern to be a non-empty string')
      }
      const opts = options || {}
      const posix = utils.isWindows(options)
      const regex = isState
        ? picomatch.compileRe(glob, options)
        : picomatch.makeRe(glob, options, false, true)
      const state = regex.state
      delete regex.state
      let isIgnored = () => false
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null }
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState)
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix })
        const result = { glob, state, regex, posix, input, output, match, isMatch }
        if (typeof opts.onResult === 'function') {
          opts.onResult(result)
        }
        if (isMatch === false) {
          result.isMatch = false
          return returnObject ? result : false
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === 'function') {
            opts.onIgnore(result)
          }
          result.isMatch = false
          return returnObject ? result : false
        }
        if (typeof opts.onMatch === 'function') {
          opts.onMatch(result)
        }
        return returnObject ? result : true
      }
      if (returnState) {
        matcher.state = state
      }
      return matcher
    }
    picomatch.test = (input, regex, options, { glob, posix } = {}) => {
      if (typeof input !== 'string') {
        throw new TypeError('Expected input to be a string')
      }
      if (input === '') {
        return { isMatch: false, output: '' }
      }
      const opts = options || {}
      const format = opts.format || (posix ? utils.toPosixSlashes : null)
      let match = input === glob
      let output = match && format ? format(input) : input
      if (match === false) {
        output = format ? format(input) : input
        match = output === glob
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch.matchBase(input, regex, options, posix)
        } else {
          match = regex.exec(output)
        }
      }
      return { isMatch: Boolean(match), match, output }
    }
    picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
      const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options)
      return regex.test(path.basename(input))
    }
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str)
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern)) return pattern.map((p) => picomatch.parse(p, options))
      return parse(pattern, { ...options, fastpaths: false })
    }
    picomatch.scan = (input, options) => scan(input, options)
    picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output
      }
      const opts = options || {}
      const prepend = opts.contains ? '' : '^'
      const append = opts.contains ? '' : '$'
      let source = `${prepend}(?:${state.output})${append}`
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`
      }
      const regex = picomatch.toRegex(source, options)
      if (returnState === true) {
        regex.state = state
      }
      return regex
    }
    picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== 'string') {
        throw new TypeError('Expected a non-empty string')
      }
      let parsed = { negated: false, fastpaths: true }
      if (options.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
        parsed.output = parse.fastpaths(input, options)
      }
      if (!parsed.output) {
        parsed = parse(input, options)
      }
      return picomatch.compileRe(parsed, options, returnOutput, returnState)
    }
    picomatch.toRegex = (source, options) => {
      try {
        const opts = options || {}
        return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''))
      } catch (err) {
        if (options && options.debug === true) throw err
        return /$^/
      }
    }
    picomatch.constants = constants
    module2.exports = picomatch
  },
})

// node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  'node_modules/picomatch/index.js'(exports, module2) {
    'use strict'
    module2.exports = require_picomatch()
  },
})

// node_modules/micromatch/index.js
var require_micromatch = __commonJS({
  'node_modules/micromatch/index.js'(exports, module2) {
    'use strict'
    var util = require('util')
    var braces = require_braces()
    var picomatch = require_picomatch2()
    var utils = require_utils2()
    var isEmptyString = (val) => val === '' || val === './'
    var micromatch = (list, patterns, options) => {
      patterns = [].concat(patterns)
      list = [].concat(list)
      let omit = /* @__PURE__ */ new Set()
      let keep = /* @__PURE__ */ new Set()
      let items = /* @__PURE__ */ new Set()
      let negatives = 0
      let onResult = (state) => {
        items.add(state.output)
        if (options && options.onResult) {
          options.onResult(state)
        }
      }
      for (let i = 0; i < patterns.length; i++) {
        let isMatch = picomatch(String(patterns[i]), { ...options, onResult }, true)
        let negated = isMatch.state.negated || isMatch.state.negatedExtglob
        if (negated) negatives++
        for (let item of list) {
          let matched = isMatch(item, true)
          let match = negated ? !matched.isMatch : matched.isMatch
          if (!match) continue
          if (negated) {
            omit.add(matched.output)
          } else {
            omit.delete(matched.output)
            keep.add(matched.output)
          }
        }
      }
      let result = negatives === patterns.length ? [...items] : [...keep]
      let matches = result.filter((item) => !omit.has(item))
      if (options && matches.length === 0) {
        if (options.failglob === true) {
          throw new Error(`No matches found for "${patterns.join(', ')}"`)
        }
        if (options.nonull === true || options.nullglob === true) {
          return options.unescape ? patterns.map((p) => p.replace(/\\/g, '')) : patterns
        }
      }
      return matches
    }
    micromatch.match = micromatch
    micromatch.matcher = (pattern, options) => picomatch(pattern, options)
    micromatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str)
    micromatch.any = micromatch.isMatch
    micromatch.not = (list, patterns, options = {}) => {
      patterns = [].concat(patterns).map(String)
      let result = /* @__PURE__ */ new Set()
      let items = []
      let onResult = (state) => {
        if (options.onResult) options.onResult(state)
        items.push(state.output)
      }
      let matches = micromatch(list, patterns, { ...options, onResult })
      for (let item of items) {
        if (!matches.includes(item)) {
          result.add(item)
        }
      }
      return [...result]
    }
    micromatch.contains = (str, pattern, options) => {
      if (typeof str !== 'string') {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`)
      }
      if (Array.isArray(pattern)) {
        return pattern.some((p) => micromatch.contains(str, p, options))
      }
      if (typeof pattern === 'string') {
        if (isEmptyString(str) || isEmptyString(pattern)) {
          return false
        }
        if (str.includes(pattern) || (str.startsWith('./') && str.slice(2).includes(pattern))) {
          return true
        }
      }
      return micromatch.isMatch(str, pattern, { ...options, contains: true })
    }
    micromatch.matchKeys = (obj, patterns, options) => {
      if (!utils.isObject(obj)) {
        throw new TypeError('Expected the first argument to be an object')
      }
      let keys = micromatch(Object.keys(obj), patterns, options)
      let res = {}
      for (let key of keys) res[key] = obj[key]
      return res
    }
    micromatch.some = (list, patterns, options) => {
      let items = [].concat(list)
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options)
        if (items.some((item) => isMatch(item))) {
          return true
        }
      }
      return false
    }
    micromatch.every = (list, patterns, options) => {
      let items = [].concat(list)
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options)
        if (!items.every((item) => isMatch(item))) {
          return false
        }
      }
      return true
    }
    micromatch.all = (str, patterns, options) => {
      if (typeof str !== 'string') {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`)
      }
      return [].concat(patterns).every((p) => picomatch(p, options)(str))
    }
    micromatch.capture = (glob, input, options) => {
      let posix = utils.isWindows(options)
      let regex = picomatch.makeRe(String(glob), { ...options, capture: true })
      let match = regex.exec(posix ? utils.toPosixSlashes(input) : input)
      if (match) {
        return match.slice(1).map((v) => (v === void 0 ? '' : v))
      }
    }
    micromatch.makeRe = (...args) => picomatch.makeRe(...args)
    micromatch.scan = (...args) => picomatch.scan(...args)
    micromatch.parse = (patterns, options) => {
      let res = []
      for (let pattern of [].concat(patterns || [])) {
        for (let str of braces(String(pattern), options)) {
          res.push(picomatch.parse(str, options))
        }
      }
      return res
    }
    micromatch.braces = (pattern, options) => {
      if (typeof pattern !== 'string') throw new TypeError('Expected a string')
      if ((options && options.nobrace === true) || !/\{.*\}/.test(pattern)) {
        return [pattern]
      }
      return braces(pattern, options)
    }
    micromatch.braceExpand = (pattern, options) => {
      if (typeof pattern !== 'string') throw new TypeError('Expected a string')
      return micromatch.braces(pattern, { ...options, expand: true })
    }
    module2.exports = micromatch
  },
})

// node_modules/fast-glob/out/utils/pattern.js
var require_pattern = __commonJS({
  'node_modules/fast-glob/out/utils/pattern.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.matchAny =
      exports.convertPatternsToRe =
      exports.makeRe =
      exports.getPatternParts =
      exports.expandBraceExpansion =
      exports.expandPatternsWithBraceExpansion =
      exports.isAffectDepthOfReadingPattern =
      exports.endsWithSlashGlobStar =
      exports.hasGlobStar =
      exports.getBaseDirectory =
      exports.isPatternRelatedToParentDirectory =
      exports.getPatternsOutsideCurrentDirectory =
      exports.getPatternsInsideCurrentDirectory =
      exports.getPositivePatterns =
      exports.getNegativePatterns =
      exports.isPositivePattern =
      exports.isNegativePattern =
      exports.convertToNegativePattern =
      exports.convertToPositivePattern =
      exports.isDynamicPattern =
      exports.isStaticPattern =
        void 0
    var path = require('path')
    var globParent = require_glob_parent()
    var micromatch = require_micromatch()
    var GLOBSTAR = '**'
    var ESCAPE_SYMBOL = '\\'
    var COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/
    var REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[[^[]*]/
    var REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\([^(]*\|[^|]*\)/
    var GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\([^(]*\)/
    var BRACE_EXPANSION_SEPARATORS_RE = /,|\.\./
    function isStaticPattern(pattern, options = {}) {
      return !isDynamicPattern(pattern, options)
    }
    exports.isStaticPattern = isStaticPattern
    function isDynamicPattern(pattern, options = {}) {
      if (pattern === '') {
        return false
      }
      if (options.caseSensitiveMatch === false || pattern.includes(ESCAPE_SYMBOL)) {
        return true
      }
      if (
        COMMON_GLOB_SYMBOLS_RE.test(pattern) ||
        REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) ||
        REGEX_GROUP_SYMBOLS_RE.test(pattern)
      ) {
        return true
      }
      if (options.extglob !== false && GLOB_EXTENSION_SYMBOLS_RE.test(pattern)) {
        return true
      }
      if (options.braceExpansion !== false && hasBraceExpansion(pattern)) {
        return true
      }
      return false
    }
    exports.isDynamicPattern = isDynamicPattern
    function hasBraceExpansion(pattern) {
      const openingBraceIndex = pattern.indexOf('{')
      if (openingBraceIndex === -1) {
        return false
      }
      const closingBraceIndex = pattern.indexOf('}', openingBraceIndex + 1)
      if (closingBraceIndex === -1) {
        return false
      }
      const braceContent = pattern.slice(openingBraceIndex, closingBraceIndex)
      return BRACE_EXPANSION_SEPARATORS_RE.test(braceContent)
    }
    function convertToPositivePattern(pattern) {
      return isNegativePattern(pattern) ? pattern.slice(1) : pattern
    }
    exports.convertToPositivePattern = convertToPositivePattern
    function convertToNegativePattern(pattern) {
      return '!' + pattern
    }
    exports.convertToNegativePattern = convertToNegativePattern
    function isNegativePattern(pattern) {
      return pattern.startsWith('!') && pattern[1] !== '('
    }
    exports.isNegativePattern = isNegativePattern
    function isPositivePattern(pattern) {
      return !isNegativePattern(pattern)
    }
    exports.isPositivePattern = isPositivePattern
    function getNegativePatterns(patterns) {
      return patterns.filter(isNegativePattern)
    }
    exports.getNegativePatterns = getNegativePatterns
    function getPositivePatterns(patterns) {
      return patterns.filter(isPositivePattern)
    }
    exports.getPositivePatterns = getPositivePatterns
    function getPatternsInsideCurrentDirectory(patterns) {
      return patterns.filter((pattern) => !isPatternRelatedToParentDirectory(pattern))
    }
    exports.getPatternsInsideCurrentDirectory = getPatternsInsideCurrentDirectory
    function getPatternsOutsideCurrentDirectory(patterns) {
      return patterns.filter(isPatternRelatedToParentDirectory)
    }
    exports.getPatternsOutsideCurrentDirectory = getPatternsOutsideCurrentDirectory
    function isPatternRelatedToParentDirectory(pattern) {
      return pattern.startsWith('..') || pattern.startsWith('./..')
    }
    exports.isPatternRelatedToParentDirectory = isPatternRelatedToParentDirectory
    function getBaseDirectory(pattern) {
      return globParent(pattern, { flipBackslashes: false })
    }
    exports.getBaseDirectory = getBaseDirectory
    function hasGlobStar(pattern) {
      return pattern.includes(GLOBSTAR)
    }
    exports.hasGlobStar = hasGlobStar
    function endsWithSlashGlobStar(pattern) {
      return pattern.endsWith('/' + GLOBSTAR)
    }
    exports.endsWithSlashGlobStar = endsWithSlashGlobStar
    function isAffectDepthOfReadingPattern(pattern) {
      const basename = path.basename(pattern)
      return endsWithSlashGlobStar(pattern) || isStaticPattern(basename)
    }
    exports.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern
    function expandPatternsWithBraceExpansion(patterns) {
      return patterns.reduce((collection, pattern) => {
        return collection.concat(expandBraceExpansion(pattern))
      }, [])
    }
    exports.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion
    function expandBraceExpansion(pattern) {
      return micromatch.braces(pattern, {
        expand: true,
        nodupes: true,
      })
    }
    exports.expandBraceExpansion = expandBraceExpansion
    function getPatternParts(pattern, options) {
      let { parts } = micromatch.scan(
        pattern,
        Object.assign(Object.assign({}, options), { parts: true })
      )
      if (parts.length === 0) {
        parts = [pattern]
      }
      if (parts[0].startsWith('/')) {
        parts[0] = parts[0].slice(1)
        parts.unshift('')
      }
      return parts
    }
    exports.getPatternParts = getPatternParts
    function makeRe(pattern, options) {
      return micromatch.makeRe(pattern, options)
    }
    exports.makeRe = makeRe
    function convertPatternsToRe(patterns, options) {
      return patterns.map((pattern) => makeRe(pattern, options))
    }
    exports.convertPatternsToRe = convertPatternsToRe
    function matchAny(entry, patternsRe) {
      return patternsRe.some((patternRe) => patternRe.test(entry))
    }
    exports.matchAny = matchAny
  },
})

// node_modules/merge2/index.js
var require_merge2 = __commonJS({
  'node_modules/merge2/index.js'(exports, module2) {
    'use strict'
    var Stream = require('stream')
    var PassThrough = Stream.PassThrough
    var slice = Array.prototype.slice
    module2.exports = merge2
    function merge2() {
      const streamsQueue = []
      const args = slice.call(arguments)
      let merging = false
      let options = args[args.length - 1]
      if (options && !Array.isArray(options) && options.pipe == null) {
        args.pop()
      } else {
        options = {}
      }
      const doEnd = options.end !== false
      const doPipeError = options.pipeError === true
      if (options.objectMode == null) {
        options.objectMode = true
      }
      if (options.highWaterMark == null) {
        options.highWaterMark = 64 * 1024
      }
      const mergedStream = PassThrough(options)
      function addStream() {
        for (let i = 0, len = arguments.length; i < len; i++) {
          streamsQueue.push(pauseStreams(arguments[i], options))
        }
        mergeStream()
        return this
      }
      function mergeStream() {
        if (merging) {
          return
        }
        merging = true
        let streams = streamsQueue.shift()
        if (!streams) {
          process.nextTick(endStream)
          return
        }
        if (!Array.isArray(streams)) {
          streams = [streams]
        }
        let pipesCount = streams.length + 1
        function next() {
          if (--pipesCount > 0) {
            return
          }
          merging = false
          mergeStream()
        }
        function pipe(stream) {
          function onend() {
            stream.removeListener('merge2UnpipeEnd', onend)
            stream.removeListener('end', onend)
            if (doPipeError) {
              stream.removeListener('error', onerror)
            }
            next()
          }
          function onerror(err) {
            mergedStream.emit('error', err)
          }
          if (stream._readableState.endEmitted) {
            return next()
          }
          stream.on('merge2UnpipeEnd', onend)
          stream.on('end', onend)
          if (doPipeError) {
            stream.on('error', onerror)
          }
          stream.pipe(mergedStream, { end: false })
          stream.resume()
        }
        for (let i = 0; i < streams.length; i++) {
          pipe(streams[i])
        }
        next()
      }
      function endStream() {
        merging = false
        mergedStream.emit('queueDrain')
        if (doEnd) {
          mergedStream.end()
        }
      }
      mergedStream.setMaxListeners(0)
      mergedStream.add = addStream
      mergedStream.on('unpipe', function (stream) {
        stream.emit('merge2UnpipeEnd')
      })
      if (args.length) {
        addStream.apply(null, args)
      }
      return mergedStream
    }
    function pauseStreams(streams, options) {
      if (!Array.isArray(streams)) {
        if (!streams._readableState && streams.pipe) {
          streams = streams.pipe(PassThrough(options))
        }
        if (!streams._readableState || !streams.pause || !streams.pipe) {
          throw new Error('Only readable stream can be merged.')
        }
        streams.pause()
      } else {
        for (let i = 0, len = streams.length; i < len; i++) {
          streams[i] = pauseStreams(streams[i], options)
        }
      }
      return streams
    }
  },
})

// node_modules/fast-glob/out/utils/stream.js
var require_stream = __commonJS({
  'node_modules/fast-glob/out/utils/stream.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.merge = void 0
    var merge2 = require_merge2()
    function merge(streams) {
      const mergedStream = merge2(streams)
      streams.forEach((stream) => {
        stream.once('error', (error) => mergedStream.emit('error', error))
      })
      mergedStream.once('close', () => propagateCloseEventToSources(streams))
      mergedStream.once('end', () => propagateCloseEventToSources(streams))
      return mergedStream
    }
    exports.merge = merge
    function propagateCloseEventToSources(streams) {
      streams.forEach((stream) => stream.emit('close'))
    }
  },
})

// node_modules/fast-glob/out/utils/string.js
var require_string = __commonJS({
  'node_modules/fast-glob/out/utils/string.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.isEmpty = exports.isString = void 0
    function isString(input) {
      return typeof input === 'string'
    }
    exports.isString = isString
    function isEmpty(input) {
      return input === ''
    }
    exports.isEmpty = isEmpty
  },
})

// node_modules/fast-glob/out/utils/index.js
var require_utils3 = __commonJS({
  'node_modules/fast-glob/out/utils/index.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.string =
      exports.stream =
      exports.pattern =
      exports.path =
      exports.fs =
      exports.errno =
      exports.array =
        void 0
    var array = require_array()
    exports.array = array
    var errno = require_errno()
    exports.errno = errno
    var fs2 = require_fs()
    exports.fs = fs2
    var path = require_path()
    exports.path = path
    var pattern = require_pattern()
    exports.pattern = pattern
    var stream = require_stream()
    exports.stream = stream
    var string = require_string()
    exports.string = string
  },
})

// node_modules/fast-glob/out/managers/tasks.js
var require_tasks = __commonJS({
  'node_modules/fast-glob/out/managers/tasks.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.convertPatternGroupToTask =
      exports.convertPatternGroupsToTasks =
      exports.groupPatternsByBaseDirectory =
      exports.getNegativePatternsAsPositive =
      exports.getPositivePatterns =
      exports.convertPatternsToTasks =
      exports.generate =
        void 0
    var utils = require_utils3()
    function generate(patterns, settings) {
      const positivePatterns = getPositivePatterns(patterns)
      const negativePatterns = getNegativePatternsAsPositive(patterns, settings.ignore)
      const staticPatterns = positivePatterns.filter((pattern) =>
        utils.pattern.isStaticPattern(pattern, settings)
      )
      const dynamicPatterns = positivePatterns.filter((pattern) =>
        utils.pattern.isDynamicPattern(pattern, settings)
      )
      const staticTasks = convertPatternsToTasks(staticPatterns, negativePatterns, false)
      const dynamicTasks = convertPatternsToTasks(dynamicPatterns, negativePatterns, true)
      return staticTasks.concat(dynamicTasks)
    }
    exports.generate = generate
    function convertPatternsToTasks(positive, negative, dynamic) {
      const tasks = []
      const patternsOutsideCurrentDirectory =
        utils.pattern.getPatternsOutsideCurrentDirectory(positive)
      const patternsInsideCurrentDirectory =
        utils.pattern.getPatternsInsideCurrentDirectory(positive)
      const outsideCurrentDirectoryGroup = groupPatternsByBaseDirectory(
        patternsOutsideCurrentDirectory
      )
      const insideCurrentDirectoryGroup = groupPatternsByBaseDirectory(
        patternsInsideCurrentDirectory
      )
      tasks.push(...convertPatternGroupsToTasks(outsideCurrentDirectoryGroup, negative, dynamic))
      if ('.' in insideCurrentDirectoryGroup) {
        tasks.push(
          convertPatternGroupToTask('.', patternsInsideCurrentDirectory, negative, dynamic)
        )
      } else {
        tasks.push(...convertPatternGroupsToTasks(insideCurrentDirectoryGroup, negative, dynamic))
      }
      return tasks
    }
    exports.convertPatternsToTasks = convertPatternsToTasks
    function getPositivePatterns(patterns) {
      return utils.pattern.getPositivePatterns(patterns)
    }
    exports.getPositivePatterns = getPositivePatterns
    function getNegativePatternsAsPositive(patterns, ignore) {
      const negative = utils.pattern.getNegativePatterns(patterns).concat(ignore)
      const positive = negative.map(utils.pattern.convertToPositivePattern)
      return positive
    }
    exports.getNegativePatternsAsPositive = getNegativePatternsAsPositive
    function groupPatternsByBaseDirectory(patterns) {
      const group = {}
      return patterns.reduce((collection, pattern) => {
        const base = utils.pattern.getBaseDirectory(pattern)
        if (base in collection) {
          collection[base].push(pattern)
        } else {
          collection[base] = [pattern]
        }
        return collection
      }, group)
    }
    exports.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory
    function convertPatternGroupsToTasks(positive, negative, dynamic) {
      return Object.keys(positive).map((base) => {
        return convertPatternGroupToTask(base, positive[base], negative, dynamic)
      })
    }
    exports.convertPatternGroupsToTasks = convertPatternGroupsToTasks
    function convertPatternGroupToTask(base, positive, negative, dynamic) {
      return {
        dynamic,
        positive,
        negative,
        base,
        patterns: [].concat(positive, negative.map(utils.pattern.convertToNegativePattern)),
      }
    }
    exports.convertPatternGroupToTask = convertPatternGroupToTask
  },
})

// node_modules/fast-glob/out/managers/patterns.js
var require_patterns = __commonJS({
  'node_modules/fast-glob/out/managers/patterns.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.removeDuplicateSlashes = exports.transform = void 0
    var DOUBLE_SLASH_RE = /(?!^)\/{2,}/g
    function transform(patterns) {
      return patterns.map((pattern) => removeDuplicateSlashes(pattern))
    }
    exports.transform = transform
    function removeDuplicateSlashes(pattern) {
      return pattern.replace(DOUBLE_SLASH_RE, '/')
    }
    exports.removeDuplicateSlashes = removeDuplicateSlashes
  },
})

// node_modules/@nodelib/fs.stat/out/providers/async.js
var require_async = __commonJS({
  'node_modules/@nodelib/fs.stat/out/providers/async.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.read = void 0
    function read(path, settings, callback) {
      settings.fs.lstat(path, (lstatError, lstat2) => {
        if (lstatError !== null) {
          callFailureCallback(callback, lstatError)
          return
        }
        if (!lstat2.isSymbolicLink() || !settings.followSymbolicLink) {
          callSuccessCallback(callback, lstat2)
          return
        }
        settings.fs.stat(path, (statError, stat) => {
          if (statError !== null) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              callFailureCallback(callback, statError)
              return
            }
            callSuccessCallback(callback, lstat2)
            return
          }
          if (settings.markSymbolicLink) {
            stat.isSymbolicLink = () => true
          }
          callSuccessCallback(callback, stat)
        })
      })
    }
    exports.read = read
    function callFailureCallback(callback, error) {
      callback(error)
    }
    function callSuccessCallback(callback, result) {
      callback(null, result)
    }
  },
})

// node_modules/@nodelib/fs.stat/out/providers/sync.js
var require_sync = __commonJS({
  'node_modules/@nodelib/fs.stat/out/providers/sync.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.read = void 0
    function read(path, settings) {
      const lstat2 = settings.fs.lstatSync(path)
      if (!lstat2.isSymbolicLink() || !settings.followSymbolicLink) {
        return lstat2
      }
      try {
        const stat = settings.fs.statSync(path)
        if (settings.markSymbolicLink) {
          stat.isSymbolicLink = () => true
        }
        return stat
      } catch (error) {
        if (!settings.throwErrorOnBrokenSymbolicLink) {
          return lstat2
        }
        throw error
      }
    }
    exports.read = read
  },
})

// node_modules/@nodelib/fs.stat/out/adapters/fs.js
var require_fs2 = __commonJS({
  'node_modules/@nodelib/fs.stat/out/adapters/fs.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0
    var fs2 = require('fs')
    exports.FILE_SYSTEM_ADAPTER = {
      lstat: fs2.lstat,
      stat: fs2.stat,
      lstatSync: fs2.lstatSync,
      statSync: fs2.statSync,
    }
    function createFileSystemAdapter(fsMethods) {
      if (fsMethods === void 0) {
        return exports.FILE_SYSTEM_ADAPTER
      }
      return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods)
    }
    exports.createFileSystemAdapter = createFileSystemAdapter
  },
})

// node_modules/@nodelib/fs.stat/out/settings.js
var require_settings = __commonJS({
  'node_modules/@nodelib/fs.stat/out/settings.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var fs2 = require_fs2()
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options
        this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, true)
        this.fs = fs2.createFileSystemAdapter(this._options.fs)
        this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, false)
        this.throwErrorOnBrokenSymbolicLink = this._getValue(
          this._options.throwErrorOnBrokenSymbolicLink,
          true
        )
      }
      _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value
      }
    }
    exports.default = Settings
  },
})

// node_modules/@nodelib/fs.stat/out/index.js
var require_out = __commonJS({
  'node_modules/@nodelib/fs.stat/out/index.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.statSync = exports.stat = exports.Settings = void 0
    var async = require_async()
    var sync = require_sync()
    var settings_1 = require_settings()
    exports.Settings = settings_1.default
    function stat(path, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback === 'function') {
        async.read(path, getSettings(), optionsOrSettingsOrCallback)
        return
      }
      async.read(path, getSettings(optionsOrSettingsOrCallback), callback)
    }
    exports.stat = stat
    function statSync(path, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings)
      return sync.read(path, settings)
    }
    exports.statSync = statSync
    function getSettings(settingsOrOptions = {}) {
      if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions
      }
      return new settings_1.default(settingsOrOptions)
    }
  },
})

// node_modules/queue-microtask/index.js
var require_queue_microtask = __commonJS({
  'node_modules/queue-microtask/index.js'(exports, module2) {
    var promise
    module2.exports =
      typeof queueMicrotask === 'function'
        ? queueMicrotask.bind(typeof window !== 'undefined' ? window : global)
        : (cb) =>
            (promise || (promise = Promise.resolve())).then(cb).catch((err) =>
              setTimeout(() => {
                throw err
              }, 0)
            )
  },
})

// node_modules/run-parallel/index.js
var require_run_parallel = __commonJS({
  'node_modules/run-parallel/index.js'(exports, module2) {
    module2.exports = runParallel
    var queueMicrotask2 = require_queue_microtask()
    function runParallel(tasks, cb) {
      let results, pending, keys
      let isSync = true
      if (Array.isArray(tasks)) {
        results = []
        pending = tasks.length
      } else {
        keys = Object.keys(tasks)
        results = {}
        pending = keys.length
      }
      function done(err) {
        function end() {
          if (cb) cb(err, results)
          cb = null
        }
        if (isSync) queueMicrotask2(end)
        else end()
      }
      function each(i, err, result) {
        results[i] = result
        if (--pending === 0 || err) {
          done(err)
        }
      }
      if (!pending) {
        done(null)
      } else if (keys) {
        keys.forEach(function (key) {
          tasks[key](function (err, result) {
            each(key, err, result)
          })
        })
      } else {
        tasks.forEach(function (task, i) {
          task(function (err, result) {
            each(i, err, result)
          })
        })
      }
      isSync = false
    }
  },
})

// node_modules/@nodelib/fs.scandir/out/constants.js
var require_constants3 = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/constants.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0
    var NODE_PROCESS_VERSION_PARTS = process.versions.node.split('.')
    if (NODE_PROCESS_VERSION_PARTS[0] === void 0 || NODE_PROCESS_VERSION_PARTS[1] === void 0) {
      throw new Error(
        `Unexpected behavior. The 'process.versions.node' variable has invalid value: ${process.versions.node}`
      )
    }
    var MAJOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[0], 10)
    var MINOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[1], 10)
    var SUPPORTED_MAJOR_VERSION = 10
    var SUPPORTED_MINOR_VERSION = 10
    var IS_MATCHED_BY_MAJOR = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION
    var IS_MATCHED_BY_MAJOR_AND_MINOR =
      MAJOR_VERSION === SUPPORTED_MAJOR_VERSION && MINOR_VERSION >= SUPPORTED_MINOR_VERSION
    exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES =
      IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR
  },
})

// node_modules/@nodelib/fs.scandir/out/utils/fs.js
var require_fs3 = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/utils/fs.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.createDirentFromStats = void 0
    var DirentFromStats = class {
      constructor(name, stats) {
        this.name = name
        this.isBlockDevice = stats.isBlockDevice.bind(stats)
        this.isCharacterDevice = stats.isCharacterDevice.bind(stats)
        this.isDirectory = stats.isDirectory.bind(stats)
        this.isFIFO = stats.isFIFO.bind(stats)
        this.isFile = stats.isFile.bind(stats)
        this.isSocket = stats.isSocket.bind(stats)
        this.isSymbolicLink = stats.isSymbolicLink.bind(stats)
      }
    }
    function createDirentFromStats(name, stats) {
      return new DirentFromStats(name, stats)
    }
    exports.createDirentFromStats = createDirentFromStats
  },
})

// node_modules/@nodelib/fs.scandir/out/utils/index.js
var require_utils4 = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/utils/index.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.fs = void 0
    var fs2 = require_fs3()
    exports.fs = fs2
  },
})

// node_modules/@nodelib/fs.scandir/out/providers/common.js
var require_common = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/providers/common.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.joinPathSegments = void 0
    function joinPathSegments(a, b, separator) {
      if (a.endsWith(separator)) {
        return a + b
      }
      return a + separator + b
    }
    exports.joinPathSegments = joinPathSegments
  },
})

// node_modules/@nodelib/fs.scandir/out/providers/async.js
var require_async2 = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/providers/async.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.readdir = exports.readdirWithFileTypes = exports.read = void 0
    var fsStat = require_out()
    var rpl = require_run_parallel()
    var constants_1 = require_constants3()
    var utils = require_utils4()
    var common = require_common()
    function read(directory, settings, callback) {
      if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        readdirWithFileTypes(directory, settings, callback)
        return
      }
      readdir(directory, settings, callback)
    }
    exports.read = read
    function readdirWithFileTypes(directory, settings, callback) {
      settings.fs.readdir(directory, { withFileTypes: true }, (readdirError, dirents) => {
        if (readdirError !== null) {
          callFailureCallback(callback, readdirError)
          return
        }
        const entries = dirents.map((dirent) => ({
          dirent,
          name: dirent.name,
          path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator),
        }))
        if (!settings.followSymbolicLinks) {
          callSuccessCallback(callback, entries)
          return
        }
        const tasks = entries.map((entry) => makeRplTaskEntry(entry, settings))
        rpl(tasks, (rplError, rplEntries) => {
          if (rplError !== null) {
            callFailureCallback(callback, rplError)
            return
          }
          callSuccessCallback(callback, rplEntries)
        })
      })
    }
    exports.readdirWithFileTypes = readdirWithFileTypes
    function makeRplTaskEntry(entry, settings) {
      return (done) => {
        if (!entry.dirent.isSymbolicLink()) {
          done(null, entry)
          return
        }
        settings.fs.stat(entry.path, (statError, stats) => {
          if (statError !== null) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              done(statError)
              return
            }
            done(null, entry)
            return
          }
          entry.dirent = utils.fs.createDirentFromStats(entry.name, stats)
          done(null, entry)
        })
      }
    }
    function readdir(directory, settings, callback) {
      settings.fs.readdir(directory, (readdirError, names) => {
        if (readdirError !== null) {
          callFailureCallback(callback, readdirError)
          return
        }
        const tasks = names.map((name) => {
          const path = common.joinPathSegments(directory, name, settings.pathSegmentSeparator)
          return (done) => {
            fsStat.stat(path, settings.fsStatSettings, (error, stats) => {
              if (error !== null) {
                done(error)
                return
              }
              const entry = {
                name,
                path,
                dirent: utils.fs.createDirentFromStats(name, stats),
              }
              if (settings.stats) {
                entry.stats = stats
              }
              done(null, entry)
            })
          }
        })
        rpl(tasks, (rplError, entries) => {
          if (rplError !== null) {
            callFailureCallback(callback, rplError)
            return
          }
          callSuccessCallback(callback, entries)
        })
      })
    }
    exports.readdir = readdir
    function callFailureCallback(callback, error) {
      callback(error)
    }
    function callSuccessCallback(callback, result) {
      callback(null, result)
    }
  },
})

// node_modules/@nodelib/fs.scandir/out/providers/sync.js
var require_sync2 = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/providers/sync.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.readdir = exports.readdirWithFileTypes = exports.read = void 0
    var fsStat = require_out()
    var constants_1 = require_constants3()
    var utils = require_utils4()
    var common = require_common()
    function read(directory, settings) {
      if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        return readdirWithFileTypes(directory, settings)
      }
      return readdir(directory, settings)
    }
    exports.read = read
    function readdirWithFileTypes(directory, settings) {
      const dirents = settings.fs.readdirSync(directory, { withFileTypes: true })
      return dirents.map((dirent) => {
        const entry = {
          dirent,
          name: dirent.name,
          path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator),
        }
        if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks) {
          try {
            const stats = settings.fs.statSync(entry.path)
            entry.dirent = utils.fs.createDirentFromStats(entry.name, stats)
          } catch (error) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              throw error
            }
          }
        }
        return entry
      })
    }
    exports.readdirWithFileTypes = readdirWithFileTypes
    function readdir(directory, settings) {
      const names = settings.fs.readdirSync(directory)
      return names.map((name) => {
        const entryPath = common.joinPathSegments(directory, name, settings.pathSegmentSeparator)
        const stats = fsStat.statSync(entryPath, settings.fsStatSettings)
        const entry = {
          name,
          path: entryPath,
          dirent: utils.fs.createDirentFromStats(name, stats),
        }
        if (settings.stats) {
          entry.stats = stats
        }
        return entry
      })
    }
    exports.readdir = readdir
  },
})

// node_modules/@nodelib/fs.scandir/out/adapters/fs.js
var require_fs4 = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/adapters/fs.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0
    var fs2 = require('fs')
    exports.FILE_SYSTEM_ADAPTER = {
      lstat: fs2.lstat,
      stat: fs2.stat,
      lstatSync: fs2.lstatSync,
      statSync: fs2.statSync,
      readdir: fs2.readdir,
      readdirSync: fs2.readdirSync,
    }
    function createFileSystemAdapter(fsMethods) {
      if (fsMethods === void 0) {
        return exports.FILE_SYSTEM_ADAPTER
      }
      return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods)
    }
    exports.createFileSystemAdapter = createFileSystemAdapter
  },
})

// node_modules/@nodelib/fs.scandir/out/settings.js
var require_settings2 = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/settings.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var path = require('path')
    var fsStat = require_out()
    var fs2 = require_fs4()
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options
        this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, false)
        this.fs = fs2.createFileSystemAdapter(this._options.fs)
        this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path.sep)
        this.stats = this._getValue(this._options.stats, false)
        this.throwErrorOnBrokenSymbolicLink = this._getValue(
          this._options.throwErrorOnBrokenSymbolicLink,
          true
        )
        this.fsStatSettings = new fsStat.Settings({
          followSymbolicLink: this.followSymbolicLinks,
          fs: this.fs,
          throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink,
        })
      }
      _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value
      }
    }
    exports.default = Settings
  },
})

// node_modules/@nodelib/fs.scandir/out/index.js
var require_out2 = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/index.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.Settings = exports.scandirSync = exports.scandir = void 0
    var async = require_async2()
    var sync = require_sync2()
    var settings_1 = require_settings2()
    exports.Settings = settings_1.default
    function scandir(path, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback === 'function') {
        async.read(path, getSettings(), optionsOrSettingsOrCallback)
        return
      }
      async.read(path, getSettings(optionsOrSettingsOrCallback), callback)
    }
    exports.scandir = scandir
    function scandirSync(path, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings)
      return sync.read(path, settings)
    }
    exports.scandirSync = scandirSync
    function getSettings(settingsOrOptions = {}) {
      if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions
      }
      return new settings_1.default(settingsOrOptions)
    }
  },
})

// node_modules/reusify/reusify.js
var require_reusify = __commonJS({
  'node_modules/reusify/reusify.js'(exports, module2) {
    'use strict'
    function reusify(Constructor) {
      var head = new Constructor()
      var tail = head
      function get() {
        var current = head
        if (current.next) {
          head = current.next
        } else {
          head = new Constructor()
          tail = head
        }
        current.next = null
        return current
      }
      function release(obj) {
        tail.next = obj
        tail = obj
      }
      return {
        get,
        release,
      }
    }
    module2.exports = reusify
  },
})

// node_modules/fastq/queue.js
var require_queue = __commonJS({
  'node_modules/fastq/queue.js'(exports, module2) {
    'use strict'
    var reusify = require_reusify()
    function fastqueue(context, worker, concurrency) {
      if (typeof context === 'function') {
        concurrency = worker
        worker = context
        context = null
      }
      if (concurrency < 1) {
        throw new Error('fastqueue concurrency must be greater than 1')
      }
      var cache = reusify(Task)
      var queueHead = null
      var queueTail = null
      var _running = 0
      var errorHandler = null
      var self = {
        push,
        drain: noop,
        saturated: noop,
        pause,
        paused: false,
        concurrency,
        running,
        resume,
        idle,
        length,
        getQueue,
        unshift,
        empty: noop,
        kill,
        killAndDrain,
        error,
      }
      return self
      function running() {
        return _running
      }
      function pause() {
        self.paused = true
      }
      function length() {
        var current = queueHead
        var counter = 0
        while (current) {
          current = current.next
          counter++
        }
        return counter
      }
      function getQueue() {
        var current = queueHead
        var tasks = []
        while (current) {
          tasks.push(current.value)
          current = current.next
        }
        return tasks
      }
      function resume() {
        if (!self.paused) return
        self.paused = false
        for (var i = 0; i < self.concurrency; i++) {
          _running++
          release()
        }
      }
      function idle() {
        return _running === 0 && self.length() === 0
      }
      function push(value, done) {
        var current = cache.get()
        current.context = context
        current.release = release
        current.value = value
        current.callback = done || noop
        current.errorHandler = errorHandler
        if (_running === self.concurrency || self.paused) {
          if (queueTail) {
            queueTail.next = current
            queueTail = current
          } else {
            queueHead = current
            queueTail = current
            self.saturated()
          }
        } else {
          _running++
          worker.call(context, current.value, current.worked)
        }
      }
      function unshift(value, done) {
        var current = cache.get()
        current.context = context
        current.release = release
        current.value = value
        current.callback = done || noop
        if (_running === self.concurrency || self.paused) {
          if (queueHead) {
            current.next = queueHead
            queueHead = current
          } else {
            queueHead = current
            queueTail = current
            self.saturated()
          }
        } else {
          _running++
          worker.call(context, current.value, current.worked)
        }
      }
      function release(holder) {
        if (holder) {
          cache.release(holder)
        }
        var next = queueHead
        if (next) {
          if (!self.paused) {
            if (queueTail === queueHead) {
              queueTail = null
            }
            queueHead = next.next
            next.next = null
            worker.call(context, next.value, next.worked)
            if (queueTail === null) {
              self.empty()
            }
          } else {
            _running--
          }
        } else if (--_running === 0) {
          self.drain()
        }
      }
      function kill() {
        queueHead = null
        queueTail = null
        self.drain = noop
      }
      function killAndDrain() {
        queueHead = null
        queueTail = null
        self.drain()
        self.drain = noop
      }
      function error(handler) {
        errorHandler = handler
      }
    }
    function noop() {}
    function Task() {
      this.value = null
      this.callback = noop
      this.next = null
      this.release = noop
      this.context = null
      this.errorHandler = null
      var self = this
      this.worked = function worked(err, result) {
        var callback = self.callback
        var errorHandler = self.errorHandler
        var val = self.value
        self.value = null
        self.callback = noop
        if (self.errorHandler) {
          errorHandler(err, val)
        }
        callback.call(self.context, err, result)
        self.release(self)
      }
    }
    function queueAsPromised(context, worker, concurrency) {
      if (typeof context === 'function') {
        concurrency = worker
        worker = context
        context = null
      }
      function asyncWrapper(arg, cb) {
        worker.call(this, arg).then(function (res) {
          cb(null, res)
        }, cb)
      }
      var queue = fastqueue(context, asyncWrapper, concurrency)
      var pushCb = queue.push
      var unshiftCb = queue.unshift
      queue.push = push
      queue.unshift = unshift
      queue.drained = drained
      return queue
      function push(value) {
        var p = new Promise(function (resolve, reject) {
          pushCb(value, function (err, result) {
            if (err) {
              reject(err)
              return
            }
            resolve(result)
          })
        })
        p.catch(noop)
        return p
      }
      function unshift(value) {
        var p = new Promise(function (resolve, reject) {
          unshiftCb(value, function (err, result) {
            if (err) {
              reject(err)
              return
            }
            resolve(result)
          })
        })
        p.catch(noop)
        return p
      }
      function drained() {
        var previousDrain = queue.drain
        var p = new Promise(function (resolve) {
          queue.drain = function () {
            previousDrain()
            resolve()
          }
        })
        return p
      }
    }
    module2.exports = fastqueue
    module2.exports.promise = queueAsPromised
  },
})

// node_modules/@nodelib/fs.walk/out/readers/common.js
var require_common2 = __commonJS({
  'node_modules/@nodelib/fs.walk/out/readers/common.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.joinPathSegments =
      exports.replacePathSegmentSeparator =
      exports.isAppliedFilter =
      exports.isFatalError =
        void 0
    function isFatalError(settings, error) {
      if (settings.errorFilter === null) {
        return true
      }
      return !settings.errorFilter(error)
    }
    exports.isFatalError = isFatalError
    function isAppliedFilter(filter, value) {
      return filter === null || filter(value)
    }
    exports.isAppliedFilter = isAppliedFilter
    function replacePathSegmentSeparator(filepath, separator) {
      return filepath.split(/[/\\]/).join(separator)
    }
    exports.replacePathSegmentSeparator = replacePathSegmentSeparator
    function joinPathSegments(a, b, separator) {
      if (a === '') {
        return b
      }
      if (a.endsWith(separator)) {
        return a + b
      }
      return a + separator + b
    }
    exports.joinPathSegments = joinPathSegments
  },
})

// node_modules/@nodelib/fs.walk/out/readers/reader.js
var require_reader = __commonJS({
  'node_modules/@nodelib/fs.walk/out/readers/reader.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var common = require_common2()
    var Reader = class {
      constructor(_root, _settings) {
        this._root = _root
        this._settings = _settings
        this._root = common.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator)
      }
    }
    exports.default = Reader
  },
})

// node_modules/@nodelib/fs.walk/out/readers/async.js
var require_async3 = __commonJS({
  'node_modules/@nodelib/fs.walk/out/readers/async.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var events_1 = require('events')
    var fsScandir = require_out2()
    var fastq = require_queue()
    var common = require_common2()
    var reader_1 = require_reader()
    var AsyncReader = class extends reader_1.default {
      constructor(_root, _settings) {
        super(_root, _settings)
        this._settings = _settings
        this._scandir = fsScandir.scandir
        this._emitter = new events_1.EventEmitter()
        this._queue = fastq(this._worker.bind(this), this._settings.concurrency)
        this._isFatalError = false
        this._isDestroyed = false
        this._queue.drain = () => {
          if (!this._isFatalError) {
            this._emitter.emit('end')
          }
        }
      }
      read() {
        this._isFatalError = false
        this._isDestroyed = false
        setImmediate(() => {
          this._pushToQueue(this._root, this._settings.basePath)
        })
        return this._emitter
      }
      get isDestroyed() {
        return this._isDestroyed
      }
      destroy() {
        if (this._isDestroyed) {
          throw new Error('The reader is already destroyed')
        }
        this._isDestroyed = true
        this._queue.killAndDrain()
      }
      onEntry(callback) {
        this._emitter.on('entry', callback)
      }
      onError(callback) {
        this._emitter.once('error', callback)
      }
      onEnd(callback) {
        this._emitter.once('end', callback)
      }
      _pushToQueue(directory, base) {
        const queueItem = { directory, base }
        this._queue.push(queueItem, (error) => {
          if (error !== null) {
            this._handleError(error)
          }
        })
      }
      _worker(item, done) {
        this._scandir(item.directory, this._settings.fsScandirSettings, (error, entries) => {
          if (error !== null) {
            done(error, void 0)
            return
          }
          for (const entry of entries) {
            this._handleEntry(entry, item.base)
          }
          done(null, void 0)
        })
      }
      _handleError(error) {
        if (this._isDestroyed || !common.isFatalError(this._settings, error)) {
          return
        }
        this._isFatalError = true
        this._isDestroyed = true
        this._emitter.emit('error', error)
      }
      _handleEntry(entry, base) {
        if (this._isDestroyed || this._isFatalError) {
          return
        }
        const fullpath = entry.path
        if (base !== void 0) {
          entry.path = common.joinPathSegments(
            base,
            entry.name,
            this._settings.pathSegmentSeparator
          )
        }
        if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
          this._emitEntry(entry)
        }
        if (
          entry.dirent.isDirectory() &&
          common.isAppliedFilter(this._settings.deepFilter, entry)
        ) {
          this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path)
        }
      }
      _emitEntry(entry) {
        this._emitter.emit('entry', entry)
      }
    }
    exports.default = AsyncReader
  },
})

// node_modules/@nodelib/fs.walk/out/providers/async.js
var require_async4 = __commonJS({
  'node_modules/@nodelib/fs.walk/out/providers/async.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var async_1 = require_async3()
    var AsyncProvider = class {
      constructor(_root, _settings) {
        this._root = _root
        this._settings = _settings
        this._reader = new async_1.default(this._root, this._settings)
        this._storage = []
      }
      read(callback) {
        this._reader.onError((error) => {
          callFailureCallback(callback, error)
        })
        this._reader.onEntry((entry) => {
          this._storage.push(entry)
        })
        this._reader.onEnd(() => {
          callSuccessCallback(callback, this._storage)
        })
        this._reader.read()
      }
    }
    exports.default = AsyncProvider
    function callFailureCallback(callback, error) {
      callback(error)
    }
    function callSuccessCallback(callback, entries) {
      callback(null, entries)
    }
  },
})

// node_modules/@nodelib/fs.walk/out/providers/stream.js
var require_stream2 = __commonJS({
  'node_modules/@nodelib/fs.walk/out/providers/stream.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var stream_1 = require('stream')
    var async_1 = require_async3()
    var StreamProvider = class {
      constructor(_root, _settings) {
        this._root = _root
        this._settings = _settings
        this._reader = new async_1.default(this._root, this._settings)
        this._stream = new stream_1.Readable({
          objectMode: true,
          read: () => {},
          destroy: () => {
            if (!this._reader.isDestroyed) {
              this._reader.destroy()
            }
          },
        })
      }
      read() {
        this._reader.onError((error) => {
          this._stream.emit('error', error)
        })
        this._reader.onEntry((entry) => {
          this._stream.push(entry)
        })
        this._reader.onEnd(() => {
          this._stream.push(null)
        })
        this._reader.read()
        return this._stream
      }
    }
    exports.default = StreamProvider
  },
})

// node_modules/@nodelib/fs.walk/out/readers/sync.js
var require_sync3 = __commonJS({
  'node_modules/@nodelib/fs.walk/out/readers/sync.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var fsScandir = require_out2()
    var common = require_common2()
    var reader_1 = require_reader()
    var SyncReader = class extends reader_1.default {
      constructor() {
        super(...arguments)
        this._scandir = fsScandir.scandirSync
        this._storage = []
        this._queue = /* @__PURE__ */ new Set()
      }
      read() {
        this._pushToQueue(this._root, this._settings.basePath)
        this._handleQueue()
        return this._storage
      }
      _pushToQueue(directory, base) {
        this._queue.add({ directory, base })
      }
      _handleQueue() {
        for (const item of this._queue.values()) {
          this._handleDirectory(item.directory, item.base)
        }
      }
      _handleDirectory(directory, base) {
        try {
          const entries = this._scandir(directory, this._settings.fsScandirSettings)
          for (const entry of entries) {
            this._handleEntry(entry, base)
          }
        } catch (error) {
          this._handleError(error)
        }
      }
      _handleError(error) {
        if (!common.isFatalError(this._settings, error)) {
          return
        }
        throw error
      }
      _handleEntry(entry, base) {
        const fullpath = entry.path
        if (base !== void 0) {
          entry.path = common.joinPathSegments(
            base,
            entry.name,
            this._settings.pathSegmentSeparator
          )
        }
        if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
          this._pushToStorage(entry)
        }
        if (
          entry.dirent.isDirectory() &&
          common.isAppliedFilter(this._settings.deepFilter, entry)
        ) {
          this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path)
        }
      }
      _pushToStorage(entry) {
        this._storage.push(entry)
      }
    }
    exports.default = SyncReader
  },
})

// node_modules/@nodelib/fs.walk/out/providers/sync.js
var require_sync4 = __commonJS({
  'node_modules/@nodelib/fs.walk/out/providers/sync.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var sync_1 = require_sync3()
    var SyncProvider = class {
      constructor(_root, _settings) {
        this._root = _root
        this._settings = _settings
        this._reader = new sync_1.default(this._root, this._settings)
      }
      read() {
        return this._reader.read()
      }
    }
    exports.default = SyncProvider
  },
})

// node_modules/@nodelib/fs.walk/out/settings.js
var require_settings3 = __commonJS({
  'node_modules/@nodelib/fs.walk/out/settings.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var path = require('path')
    var fsScandir = require_out2()
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options
        this.basePath = this._getValue(this._options.basePath, void 0)
        this.concurrency = this._getValue(this._options.concurrency, Number.POSITIVE_INFINITY)
        this.deepFilter = this._getValue(this._options.deepFilter, null)
        this.entryFilter = this._getValue(this._options.entryFilter, null)
        this.errorFilter = this._getValue(this._options.errorFilter, null)
        this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path.sep)
        this.fsScandirSettings = new fsScandir.Settings({
          followSymbolicLinks: this._options.followSymbolicLinks,
          fs: this._options.fs,
          pathSegmentSeparator: this._options.pathSegmentSeparator,
          stats: this._options.stats,
          throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink,
        })
      }
      _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value
      }
    }
    exports.default = Settings
  },
})

// node_modules/@nodelib/fs.walk/out/index.js
var require_out3 = __commonJS({
  'node_modules/@nodelib/fs.walk/out/index.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.Settings = exports.walkStream = exports.walkSync = exports.walk = void 0
    var async_1 = require_async4()
    var stream_1 = require_stream2()
    var sync_1 = require_sync4()
    var settings_1 = require_settings3()
    exports.Settings = settings_1.default
    function walk(directory, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback === 'function') {
        new async_1.default(directory, getSettings()).read(optionsOrSettingsOrCallback)
        return
      }
      new async_1.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback)
    }
    exports.walk = walk
    function walkSync(directory, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings)
      const provider = new sync_1.default(directory, settings)
      return provider.read()
    }
    exports.walkSync = walkSync
    function walkStream(directory, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings)
      const provider = new stream_1.default(directory, settings)
      return provider.read()
    }
    exports.walkStream = walkStream
    function getSettings(settingsOrOptions = {}) {
      if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions
      }
      return new settings_1.default(settingsOrOptions)
    }
  },
})

// node_modules/fast-glob/out/readers/reader.js
var require_reader2 = __commonJS({
  'node_modules/fast-glob/out/readers/reader.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var path = require('path')
    var fsStat = require_out()
    var utils = require_utils3()
    var Reader = class {
      constructor(_settings) {
        this._settings = _settings
        this._fsStatSettings = new fsStat.Settings({
          followSymbolicLink: this._settings.followSymbolicLinks,
          fs: this._settings.fs,
          throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks,
        })
      }
      _getFullEntryPath(filepath) {
        return path.resolve(this._settings.cwd, filepath)
      }
      _makeEntry(stats, pattern) {
        const entry = {
          name: pattern,
          path: pattern,
          dirent: utils.fs.createDirentFromStats(pattern, stats),
        }
        if (this._settings.stats) {
          entry.stats = stats
        }
        return entry
      }
      _isFatalError(error) {
        return !utils.errno.isEnoentCodeError(error) && !this._settings.suppressErrors
      }
    }
    exports.default = Reader
  },
})

// node_modules/fast-glob/out/readers/stream.js
var require_stream3 = __commonJS({
  'node_modules/fast-glob/out/readers/stream.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var stream_1 = require('stream')
    var fsStat = require_out()
    var fsWalk = require_out3()
    var reader_1 = require_reader2()
    var ReaderStream = class extends reader_1.default {
      constructor() {
        super(...arguments)
        this._walkStream = fsWalk.walkStream
        this._stat = fsStat.stat
      }
      dynamic(root, options) {
        return this._walkStream(root, options)
      }
      static(patterns, options) {
        const filepaths = patterns.map(this._getFullEntryPath, this)
        const stream = new stream_1.PassThrough({ objectMode: true })
        stream._write = (index, _enc, done) => {
          return this._getEntry(filepaths[index], patterns[index], options)
            .then((entry) => {
              if (entry !== null && options.entryFilter(entry)) {
                stream.push(entry)
              }
              if (index === filepaths.length - 1) {
                stream.end()
              }
              done()
            })
            .catch(done)
        }
        for (let i = 0; i < filepaths.length; i++) {
          stream.write(i)
        }
        return stream
      }
      _getEntry(filepath, pattern, options) {
        return this._getStat(filepath)
          .then((stats) => this._makeEntry(stats, pattern))
          .catch((error) => {
            if (options.errorFilter(error)) {
              return null
            }
            throw error
          })
      }
      _getStat(filepath) {
        return new Promise((resolve, reject) => {
          this._stat(filepath, this._fsStatSettings, (error, stats) => {
            return error === null ? resolve(stats) : reject(error)
          })
        })
      }
    }
    exports.default = ReaderStream
  },
})

// node_modules/fast-glob/out/providers/matchers/matcher.js
var require_matcher = __commonJS({
  'node_modules/fast-glob/out/providers/matchers/matcher.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var utils = require_utils3()
    var Matcher = class {
      constructor(_patterns, _settings, _micromatchOptions) {
        this._patterns = _patterns
        this._settings = _settings
        this._micromatchOptions = _micromatchOptions
        this._storage = []
        this._fillStorage()
      }
      _fillStorage() {
        const patterns = utils.pattern.expandPatternsWithBraceExpansion(this._patterns)
        for (const pattern of patterns) {
          const segments = this._getPatternSegments(pattern)
          const sections = this._splitSegmentsIntoSections(segments)
          this._storage.push({
            complete: sections.length <= 1,
            pattern,
            segments,
            sections,
          })
        }
      }
      _getPatternSegments(pattern) {
        const parts = utils.pattern.getPatternParts(pattern, this._micromatchOptions)
        return parts.map((part) => {
          const dynamic = utils.pattern.isDynamicPattern(part, this._settings)
          if (!dynamic) {
            return {
              dynamic: false,
              pattern: part,
            }
          }
          return {
            dynamic: true,
            pattern: part,
            patternRe: utils.pattern.makeRe(part, this._micromatchOptions),
          }
        })
      }
      _splitSegmentsIntoSections(segments) {
        return utils.array.splitWhen(
          segments,
          (segment) => segment.dynamic && utils.pattern.hasGlobStar(segment.pattern)
        )
      }
    }
    exports.default = Matcher
  },
})

// node_modules/fast-glob/out/providers/matchers/partial.js
var require_partial = __commonJS({
  'node_modules/fast-glob/out/providers/matchers/partial.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var matcher_1 = require_matcher()
    var PartialMatcher = class extends matcher_1.default {
      match(filepath) {
        const parts = filepath.split('/')
        const levels = parts.length
        const patterns = this._storage.filter(
          (info) => !info.complete || info.segments.length > levels
        )
        for (const pattern of patterns) {
          const section = pattern.sections[0]
          if (!pattern.complete && levels > section.length) {
            return true
          }
          const match = parts.every((part, index) => {
            const segment = pattern.segments[index]
            if (segment.dynamic && segment.patternRe.test(part)) {
              return true
            }
            if (!segment.dynamic && segment.pattern === part) {
              return true
            }
            return false
          })
          if (match) {
            return true
          }
        }
        return false
      }
    }
    exports.default = PartialMatcher
  },
})

// node_modules/fast-glob/out/providers/filters/deep.js
var require_deep = __commonJS({
  'node_modules/fast-glob/out/providers/filters/deep.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var utils = require_utils3()
    var partial_1 = require_partial()
    var DeepFilter = class {
      constructor(_settings, _micromatchOptions) {
        this._settings = _settings
        this._micromatchOptions = _micromatchOptions
      }
      getFilter(basePath, positive, negative) {
        const matcher = this._getMatcher(positive)
        const negativeRe = this._getNegativePatternsRe(negative)
        return (entry) => this._filter(basePath, entry, matcher, negativeRe)
      }
      _getMatcher(patterns) {
        return new partial_1.default(patterns, this._settings, this._micromatchOptions)
      }
      _getNegativePatternsRe(patterns) {
        const affectDepthOfReadingPatterns = patterns.filter(
          utils.pattern.isAffectDepthOfReadingPattern
        )
        return utils.pattern.convertPatternsToRe(
          affectDepthOfReadingPatterns,
          this._micromatchOptions
        )
      }
      _filter(basePath, entry, matcher, negativeRe) {
        if (this._isSkippedByDeep(basePath, entry.path)) {
          return false
        }
        if (this._isSkippedSymbolicLink(entry)) {
          return false
        }
        const filepath = utils.path.removeLeadingDotSegment(entry.path)
        if (this._isSkippedByPositivePatterns(filepath, matcher)) {
          return false
        }
        return this._isSkippedByNegativePatterns(filepath, negativeRe)
      }
      _isSkippedByDeep(basePath, entryPath) {
        if (this._settings.deep === Infinity) {
          return false
        }
        return this._getEntryLevel(basePath, entryPath) >= this._settings.deep
      }
      _getEntryLevel(basePath, entryPath) {
        const entryPathDepth = entryPath.split('/').length
        if (basePath === '') {
          return entryPathDepth
        }
        const basePathDepth = basePath.split('/').length
        return entryPathDepth - basePathDepth
      }
      _isSkippedSymbolicLink(entry) {
        return !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink()
      }
      _isSkippedByPositivePatterns(entryPath, matcher) {
        return !this._settings.baseNameMatch && !matcher.match(entryPath)
      }
      _isSkippedByNegativePatterns(entryPath, patternsRe) {
        return !utils.pattern.matchAny(entryPath, patternsRe)
      }
    }
    exports.default = DeepFilter
  },
})

// node_modules/fast-glob/out/providers/filters/entry.js
var require_entry = __commonJS({
  'node_modules/fast-glob/out/providers/filters/entry.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var utils = require_utils3()
    var EntryFilter = class {
      constructor(_settings, _micromatchOptions) {
        this._settings = _settings
        this._micromatchOptions = _micromatchOptions
        this.index = /* @__PURE__ */ new Map()
      }
      getFilter(positive, negative) {
        const positiveRe = utils.pattern.convertPatternsToRe(positive, this._micromatchOptions)
        const negativeRe = utils.pattern.convertPatternsToRe(negative, this._micromatchOptions)
        return (entry) => this._filter(entry, positiveRe, negativeRe)
      }
      _filter(entry, positiveRe, negativeRe) {
        if (this._settings.unique && this._isDuplicateEntry(entry)) {
          return false
        }
        if (this._onlyFileFilter(entry) || this._onlyDirectoryFilter(entry)) {
          return false
        }
        if (this._isSkippedByAbsoluteNegativePatterns(entry.path, negativeRe)) {
          return false
        }
        const filepath = this._settings.baseNameMatch ? entry.name : entry.path
        const isMatched =
          this._isMatchToPatterns(filepath, positiveRe) &&
          !this._isMatchToPatterns(entry.path, negativeRe)
        if (this._settings.unique && isMatched) {
          this._createIndexRecord(entry)
        }
        return isMatched
      }
      _isDuplicateEntry(entry) {
        return this.index.has(entry.path)
      }
      _createIndexRecord(entry) {
        this.index.set(entry.path, void 0)
      }
      _onlyFileFilter(entry) {
        return this._settings.onlyFiles && !entry.dirent.isFile()
      }
      _onlyDirectoryFilter(entry) {
        return this._settings.onlyDirectories && !entry.dirent.isDirectory()
      }
      _isSkippedByAbsoluteNegativePatterns(entryPath, patternsRe) {
        if (!this._settings.absolute) {
          return false
        }
        const fullpath = utils.path.makeAbsolute(this._settings.cwd, entryPath)
        return utils.pattern.matchAny(fullpath, patternsRe)
      }
      _isMatchToPatterns(entryPath, patternsRe) {
        const filepath = utils.path.removeLeadingDotSegment(entryPath)
        return (
          utils.pattern.matchAny(filepath, patternsRe) ||
          utils.pattern.matchAny(filepath + '/', patternsRe)
        )
      }
    }
    exports.default = EntryFilter
  },
})

// node_modules/fast-glob/out/providers/filters/error.js
var require_error2 = __commonJS({
  'node_modules/fast-glob/out/providers/filters/error.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var utils = require_utils3()
    var ErrorFilter = class {
      constructor(_settings) {
        this._settings = _settings
      }
      getFilter() {
        return (error) => this._isNonFatalError(error)
      }
      _isNonFatalError(error) {
        return utils.errno.isEnoentCodeError(error) || this._settings.suppressErrors
      }
    }
    exports.default = ErrorFilter
  },
})

// node_modules/fast-glob/out/providers/transformers/entry.js
var require_entry2 = __commonJS({
  'node_modules/fast-glob/out/providers/transformers/entry.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var utils = require_utils3()
    var EntryTransformer = class {
      constructor(_settings) {
        this._settings = _settings
      }
      getTransformer() {
        return (entry) => this._transform(entry)
      }
      _transform(entry) {
        let filepath = entry.path
        if (this._settings.absolute) {
          filepath = utils.path.makeAbsolute(this._settings.cwd, filepath)
          filepath = utils.path.unixify(filepath)
        }
        if (this._settings.markDirectories && entry.dirent.isDirectory()) {
          filepath += '/'
        }
        if (!this._settings.objectMode) {
          return filepath
        }
        return Object.assign(Object.assign({}, entry), { path: filepath })
      }
    }
    exports.default = EntryTransformer
  },
})

// node_modules/fast-glob/out/providers/provider.js
var require_provider = __commonJS({
  'node_modules/fast-glob/out/providers/provider.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var path = require('path')
    var deep_1 = require_deep()
    var entry_1 = require_entry()
    var error_1 = require_error2()
    var entry_2 = require_entry2()
    var Provider = class {
      constructor(_settings) {
        this._settings = _settings
        this.errorFilter = new error_1.default(this._settings)
        this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions())
        this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions())
        this.entryTransformer = new entry_2.default(this._settings)
      }
      _getRootDirectory(task) {
        return path.resolve(this._settings.cwd, task.base)
      }
      _getReaderOptions(task) {
        const basePath = task.base === '.' ? '' : task.base
        return {
          basePath,
          pathSegmentSeparator: '/',
          concurrency: this._settings.concurrency,
          deepFilter: this.deepFilter.getFilter(basePath, task.positive, task.negative),
          entryFilter: this.entryFilter.getFilter(task.positive, task.negative),
          errorFilter: this.errorFilter.getFilter(),
          followSymbolicLinks: this._settings.followSymbolicLinks,
          fs: this._settings.fs,
          stats: this._settings.stats,
          throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
          transform: this.entryTransformer.getTransformer(),
        }
      }
      _getMicromatchOptions() {
        return {
          dot: this._settings.dot,
          matchBase: this._settings.baseNameMatch,
          nobrace: !this._settings.braceExpansion,
          nocase: !this._settings.caseSensitiveMatch,
          noext: !this._settings.extglob,
          noglobstar: !this._settings.globstar,
          posix: true,
          strictSlashes: false,
        }
      }
    }
    exports.default = Provider
  },
})

// node_modules/fast-glob/out/providers/async.js
var require_async5 = __commonJS({
  'node_modules/fast-glob/out/providers/async.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var stream_1 = require_stream3()
    var provider_1 = require_provider()
    var ProviderAsync = class extends provider_1.default {
      constructor() {
        super(...arguments)
        this._reader = new stream_1.default(this._settings)
      }
      read(task) {
        const root = this._getRootDirectory(task)
        const options = this._getReaderOptions(task)
        const entries = []
        return new Promise((resolve, reject) => {
          const stream = this.api(root, task, options)
          stream.once('error', reject)
          stream.on('data', (entry) => entries.push(options.transform(entry)))
          stream.once('end', () => resolve(entries))
        })
      }
      api(root, task, options) {
        if (task.dynamic) {
          return this._reader.dynamic(root, options)
        }
        return this._reader.static(task.patterns, options)
      }
    }
    exports.default = ProviderAsync
  },
})

// node_modules/fast-glob/out/providers/stream.js
var require_stream4 = __commonJS({
  'node_modules/fast-glob/out/providers/stream.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var stream_1 = require('stream')
    var stream_2 = require_stream3()
    var provider_1 = require_provider()
    var ProviderStream = class extends provider_1.default {
      constructor() {
        super(...arguments)
        this._reader = new stream_2.default(this._settings)
      }
      read(task) {
        const root = this._getRootDirectory(task)
        const options = this._getReaderOptions(task)
        const source = this.api(root, task, options)
        const destination = new stream_1.Readable({ objectMode: true, read: () => {} })
        source
          .once('error', (error) => destination.emit('error', error))
          .on('data', (entry) => destination.emit('data', options.transform(entry)))
          .once('end', () => destination.emit('end'))
        destination.once('close', () => source.destroy())
        return destination
      }
      api(root, task, options) {
        if (task.dynamic) {
          return this._reader.dynamic(root, options)
        }
        return this._reader.static(task.patterns, options)
      }
    }
    exports.default = ProviderStream
  },
})

// node_modules/fast-glob/out/readers/sync.js
var require_sync5 = __commonJS({
  'node_modules/fast-glob/out/readers/sync.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var fsStat = require_out()
    var fsWalk = require_out3()
    var reader_1 = require_reader2()
    var ReaderSync = class extends reader_1.default {
      constructor() {
        super(...arguments)
        this._walkSync = fsWalk.walkSync
        this._statSync = fsStat.statSync
      }
      dynamic(root, options) {
        return this._walkSync(root, options)
      }
      static(patterns, options) {
        const entries = []
        for (const pattern of patterns) {
          const filepath = this._getFullEntryPath(pattern)
          const entry = this._getEntry(filepath, pattern, options)
          if (entry === null || !options.entryFilter(entry)) {
            continue
          }
          entries.push(entry)
        }
        return entries
      }
      _getEntry(filepath, pattern, options) {
        try {
          const stats = this._getStat(filepath)
          return this._makeEntry(stats, pattern)
        } catch (error) {
          if (options.errorFilter(error)) {
            return null
          }
          throw error
        }
      }
      _getStat(filepath) {
        return this._statSync(filepath, this._fsStatSettings)
      }
    }
    exports.default = ReaderSync
  },
})

// node_modules/fast-glob/out/providers/sync.js
var require_sync6 = __commonJS({
  'node_modules/fast-glob/out/providers/sync.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var sync_1 = require_sync5()
    var provider_1 = require_provider()
    var ProviderSync = class extends provider_1.default {
      constructor() {
        super(...arguments)
        this._reader = new sync_1.default(this._settings)
      }
      read(task) {
        const root = this._getRootDirectory(task)
        const options = this._getReaderOptions(task)
        const entries = this.api(root, task, options)
        return entries.map(options.transform)
      }
      api(root, task, options) {
        if (task.dynamic) {
          return this._reader.dynamic(root, options)
        }
        return this._reader.static(task.patterns, options)
      }
    }
    exports.default = ProviderSync
  },
})

// node_modules/fast-glob/out/settings.js
var require_settings4 = __commonJS({
  'node_modules/fast-glob/out/settings.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.DEFAULT_FILE_SYSTEM_ADAPTER = void 0
    var fs2 = require('fs')
    var os = require('os')
    var CPU_COUNT = Math.max(os.cpus().length, 1)
    exports.DEFAULT_FILE_SYSTEM_ADAPTER = {
      lstat: fs2.lstat,
      lstatSync: fs2.lstatSync,
      stat: fs2.stat,
      statSync: fs2.statSync,
      readdir: fs2.readdir,
      readdirSync: fs2.readdirSync,
    }
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options
        this.absolute = this._getValue(this._options.absolute, false)
        this.baseNameMatch = this._getValue(this._options.baseNameMatch, false)
        this.braceExpansion = this._getValue(this._options.braceExpansion, true)
        this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, true)
        this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT)
        this.cwd = this._getValue(this._options.cwd, process.cwd())
        this.deep = this._getValue(this._options.deep, Infinity)
        this.dot = this._getValue(this._options.dot, false)
        this.extglob = this._getValue(this._options.extglob, true)
        this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, true)
        this.fs = this._getFileSystemMethods(this._options.fs)
        this.globstar = this._getValue(this._options.globstar, true)
        this.ignore = this._getValue(this._options.ignore, [])
        this.markDirectories = this._getValue(this._options.markDirectories, false)
        this.objectMode = this._getValue(this._options.objectMode, false)
        this.onlyDirectories = this._getValue(this._options.onlyDirectories, false)
        this.onlyFiles = this._getValue(this._options.onlyFiles, true)
        this.stats = this._getValue(this._options.stats, false)
        this.suppressErrors = this._getValue(this._options.suppressErrors, false)
        this.throwErrorOnBrokenSymbolicLink = this._getValue(
          this._options.throwErrorOnBrokenSymbolicLink,
          false
        )
        this.unique = this._getValue(this._options.unique, true)
        if (this.onlyDirectories) {
          this.onlyFiles = false
        }
        if (this.stats) {
          this.objectMode = true
        }
      }
      _getValue(option, value) {
        return option === void 0 ? value : option
      }
      _getFileSystemMethods(methods = {}) {
        return Object.assign(Object.assign({}, exports.DEFAULT_FILE_SYSTEM_ADAPTER), methods)
      }
    }
    exports.default = Settings
  },
})

// node_modules/fast-glob/out/index.js
var require_out4 = __commonJS({
  'node_modules/fast-glob/out/index.js'(exports, module2) {
    'use strict'
    var taskManager = require_tasks()
    var patternManager = require_patterns()
    var async_1 = require_async5()
    var stream_1 = require_stream4()
    var sync_1 = require_sync6()
    var settings_1 = require_settings4()
    var utils = require_utils3()
    async function FastGlob(source, options) {
      assertPatternsInput(source)
      const works = getWorks(source, async_1.default, options)
      const result = await Promise.all(works)
      return utils.array.flatten(result)
    }
    ;(function (FastGlob2) {
      function sync(source, options) {
        assertPatternsInput(source)
        const works = getWorks(source, sync_1.default, options)
        return utils.array.flatten(works)
      }
      FastGlob2.sync = sync
      function stream(source, options) {
        assertPatternsInput(source)
        const works = getWorks(source, stream_1.default, options)
        return utils.stream.merge(works)
      }
      FastGlob2.stream = stream
      function generateTasks(source, options) {
        assertPatternsInput(source)
        const patterns = patternManager.transform([].concat(source))
        const settings = new settings_1.default(options)
        return taskManager.generate(patterns, settings)
      }
      FastGlob2.generateTasks = generateTasks
      function isDynamicPattern(source, options) {
        assertPatternsInput(source)
        const settings = new settings_1.default(options)
        return utils.pattern.isDynamicPattern(source, settings)
      }
      FastGlob2.isDynamicPattern = isDynamicPattern
      function escapePath(source) {
        assertPatternsInput(source)
        return utils.path.escape(source)
      }
      FastGlob2.escapePath = escapePath
    })(FastGlob || (FastGlob = {}))
    function getWorks(source, _Provider, options) {
      const patterns = patternManager.transform([].concat(source))
      const settings = new settings_1.default(options)
      const tasks = taskManager.generate(patterns, settings)
      const provider = new _Provider(settings)
      return tasks.map(provider.read, provider)
    }
    function assertPatternsInput(input) {
      const source = [].concat(input)
      const isValidSource = source.every(
        (item) => utils.string.isString(item) && !utils.string.isEmpty(item)
      )
      if (!isValidSource) {
        throw new TypeError('Patterns must be a string (non empty) or an array of strings')
      }
    }
    module2.exports = FastGlob
  },
})

// src/bin/one-report-publisher.ts
var import_commander = __toESM(require_commander(), 1)

// node_modules/@cucumber/ci-environment/dist/esm/src/CiEnvironments.js
var CiEnvironments = [
  {
    name: 'Azure Pipelines',
    url: '${BUILD_BUILDURI}',
    buildNumber: '${BUILD_BUILDNUMBER}',
    git: {
      remote: '${BUILD_REPOSITORY_URI}',
      revision: '${BUILD_SOURCEVERSION}',
      branch: '${BUILD_SOURCEBRANCH/refs/heads/(.*)/\\1}',
      tag: '${BUILD_SOURCEBRANCH/refs/tags/(.*)/\\1}',
    },
  },
  {
    name: 'Bamboo',
    url: '${bamboo_buildResultsUrl}',
    buildNumber: '${bamboo_buildNumber}',
    git: {
      remote: '${bamboo_planRepository_repositoryUrl}',
      revision: '${bamboo_planRepository_revision}',
      branch: '${bamboo_planRepository_branch}',
    },
  },
  {
    name: 'Buddy',
    url: '${BUDDY_EXECUTION_URL}',
    buildNumber: '${BUDDY_EXECUTION_ID}',
    git: {
      remote: '${BUDDY_SCM_URL}',
      revision: '${BUDDY_EXECUTION_REVISION}',
      branch: '${BUDDY_EXECUTION_BRANCH}',
      tag: '${BUDDY_EXECUTION_TAG}',
    },
  },
  {
    name: 'Bitrise',
    url: '${BITRISE_BUILD_URL}',
    buildNumber: '${BITRISE_BUILD_NUMBER}',
    git: {
      remote: '${GIT_REPOSITORY_URL}',
      revision: '${BITRISE_GIT_COMMIT}',
      branch: '${BITRISE_GIT_BRANCH}',
      tag: '${BITRISE_GIT_TAG}',
    },
  },
  {
    name: 'CircleCI',
    url: '${CIRCLE_BUILD_URL}',
    buildNumber: '${CIRCLE_BUILD_NUM}',
    git: {
      remote: '${CIRCLE_REPOSITORY_URL}',
      revision: '${CIRCLE_SHA1}',
      branch: '${CIRCLE_BRANCH}',
      tag: '${CIRCLE_TAG}',
    },
  },
  {
    name: 'CodeFresh',
    url: '${CF_BUILD_URL}',
    buildNumber: '${CF_BUILD_ID}',
    git: {
      remote: '${CF_COMMIT_URL/(.*)\\/commit.+$/\\1}.git',
      revision: '${CF_REVISION}',
      branch: '${CF_BRANCH}',
    },
  },
  {
    name: 'CodeShip',
    url: '${CI_BUILD_URL}',
    buildNumber: '${CI_BUILD_NUMBER}',
    git: {
      remote: '${CI_PULL_REQUEST/(.*)\\/pull\\/\\d+/\\1.git}',
      revision: '${CI_COMMIT_ID}',
      branch: '${CI_BRANCH}',
    },
  },
  {
    name: 'GitHub Actions',
    url: '${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}',
    buildNumber: '${GITHUB_RUN_ID}',
    git: {
      remote: '${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}.git',
      revision: '${GITHUB_SHA}',
      branch: '${GITHUB_REF/refs/heads/(.*)/\\1}',
      tag: '${GITHUB_REF/refs/tags/(.*)/\\1}',
    },
  },
  {
    name: 'GitLab',
    url: '${CI_JOB_URL}',
    buildNumber: '${CI_JOB_ID}',
    git: {
      remote: '${CI_REPOSITORY_URL}',
      revision: '${CI_COMMIT_SHA}',
      branch: '${CI_COMMIT_BRANCH}',
      tag: '${CI_COMMIT_TAG}',
    },
  },
  {
    name: 'GoCD',
    url: '${GO_SERVER_URL}/pipelines/${GO_PIPELINE_NAME}/${GO_PIPELINE_COUNTER}/${GO_STAGE_NAME}/${GO_STAGE_COUNTER}',
    buildNumber: '${GO_PIPELINE_NAME}/${GO_PIPELINE_COUNTER}/${GO_STAGE_NAME}/${GO_STAGE_COUNTER}',
    git: {
      remote: '${GO_SCM_*_PR_URL/(.*)\\/pull\\/\\d+/\\1.git}',
      revision: '${GO_REVISION}',
      branch: '${GO_SCM_*_PR_BRANCH/.*:(.*)/\\1}',
    },
  },
  {
    name: 'Jenkins',
    url: '${BUILD_URL}',
    buildNumber: '${BUILD_NUMBER}',
    git: {
      remote: '${GIT_URL}',
      revision: '${GIT_COMMIT}',
      branch: '${GIT_LOCAL_BRANCH}',
    },
  },
  {
    name: 'Semaphore',
    url: '${SEMAPHORE_ORGANIZATION_URL}/jobs/${SEMAPHORE_JOB_ID}',
    buildNumber: '${SEMAPHORE_JOB_ID}',
    git: {
      remote: '${SEMAPHORE_GIT_URL}',
      revision: '${SEMAPHORE_GIT_SHA}',
      branch: '${SEMAPHORE_GIT_BRANCH}',
      tag: '${SEMAPHORE_GIT_TAG_NAME}',
    },
  },
  {
    name: 'Travis CI',
    url: '${TRAVIS_BUILD_WEB_URL}',
    buildNumber: '${TRAVIS_JOB_NUMBER}',
    git: {
      remote: 'https://github.com/${TRAVIS_REPO_SLUG}.git',
      revision: '${TRAVIS_COMMIT}',
      branch: '${TRAVIS_BRANCH}',
      tag: '${TRAVIS_TAG}',
    },
  },
  {
    name: 'Wercker',
    url: '${WERCKER_RUN_URL}',
    buildNumber: '${WERCKER_RUN_URL/.*\\/([^\\/]+)$/\\1}',
    git: {
      remote: 'https://${WERCKER_GIT_DOMAIN}/${WERCKER_GIT_OWNER}/${WERCKER_GIT_REPOSITORY}.git',
      revision: '${WERCKER_GIT_COMMIT}',
      branch: '${WERCKER_GIT_BRANCH}',
    },
  },
]

// node_modules/@cucumber/ci-environment/dist/esm/src/evaluateVariableExpression.js
function evaluateVariableExpression(expression, env) {
  if (expression === void 0) {
    return void 0
  }
  try {
    const re = new RegExp('\\${(.*?)(?:(?<!\\\\)/(.*)/(.*))?}', 'g')
    return expression.replace(re, (substring, ...args) => {
      const variable = args[0]
      const value = getValue(env, variable)
      if (value === void 0) {
        throw new Error(`Undefined variable: ${variable}`)
      }
      const pattern = args[1]
      if (!pattern) {
        return value
      }
      const regExp = new RegExp(pattern.replace('/', '/'))
      const match = regExp.exec(value)
      if (!match) {
        throw new Error(`No match for: ${variable}`)
      }
      let replacement = args[2]
      let ref = 1
      for (const group of match.slice(1)) {
        replacement = replacement.replace(`\\${ref++}`, group)
      }
      return replacement
    })
  } catch (err) {
    return void 0
  }
}
function getValue(env, variable) {
  if (variable.includes('*')) {
    const regexp = new RegExp(variable.replace('*', '.*'))
    for (const [name, value] of Object.entries(env)) {
      if (regexp.exec(name)) {
        return value
      }
    }
  }
  return env[variable]
}

// node_modules/@cucumber/ci-environment/dist/esm/src/detectCiEnvironment.js
function detectCiEnvironment(env) {
  for (const ciEnvironment of CiEnvironments) {
    const detected = detect(ciEnvironment, env)
    if (detected) {
      return detected
    }
  }
}
function removeUserInfoFromUrl(value) {
  if (!value) return value
  try {
    const url = new URL(value)
    url.password = ''
    url.username = ''
    return url.toString()
  } catch (ignore) {
    return value
  }
}
function detectGit(ciEnvironment, env) {
  var _a, _b, _c, _d
  const revision = evaluateVariableExpression(
    (_a = ciEnvironment.git) === null || _a === void 0 ? void 0 : _a.revision,
    env
  )
  if (!revision) {
    return void 0
  }
  const remote = evaluateVariableExpression(
    (_b = ciEnvironment.git) === null || _b === void 0 ? void 0 : _b.remote,
    env
  )
  if (!remote) {
    return void 0
  }
  const tag = evaluateVariableExpression(
    (_c = ciEnvironment.git) === null || _c === void 0 ? void 0 : _c.tag,
    env
  )
  const branch = evaluateVariableExpression(
    (_d = ciEnvironment.git) === null || _d === void 0 ? void 0 : _d.branch,
    env
  )
  return Object.assign(
    Object.assign({ revision, remote: removeUserInfoFromUrl(remote) }, tag && { tag }),
    branch && { branch }
  )
}
function detect(ciEnvironment, env) {
  const url = evaluateVariableExpression(ciEnvironment.url, env)
  if (url === void 0) {
    return void 0
  }
  const buildNumber = evaluateVariableExpression(ciEnvironment.buildNumber, env)
  const git = detectGit(ciEnvironment, env)
  return Object.assign(
    {
      name: ciEnvironment.name,
      url,
      buildNumber,
    },
    git && { git }
  )
}

// node_modules/@cucumber/ci-environment/dist/esm/src/index.js
var src_default = detectCiEnvironment

// src/publish.ts
var import_fast_glob = __toESM(require_out4(), 1)
var import_fs = __toESM(require('fs'), 1)
var import_http = __toESM(require('http'), 1)
var import_https = __toESM(require('https'), 1)
var import_path = require('path')
var import_stream = require('stream')
var import_url = require('url')
var import_util = require('util')

// src/readStream.ts
async function readStream(req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

// src/publish.ts
var lstat = (0, import_util.promisify)(import_fs.default.lstat)
var extensions = ['.xml', '.json', '.ndjson', '.zip']
var contentTypes = {
  '.xml': 'text/xml',
  '.json': 'application/json',
  '.ndjson': 'application/x-ndjson',
  '.zip': 'application/zip',
}
async function publish(globs, organizationId, baseUrl, env, authenticate) {
  if (!Array.isArray(globs)) {
    throw new Error('globs must be an array')
  }
  if (globs.length === 0) {
    throw new Error('globs cannot be empty')
  }
  const authHeaders = await authenticate()
  const url = new import_url.URL(
    `/api/organization/${encodeURIComponent(organizationId)}/execution`,
    baseUrl
  )
  const ciEnv = src_default(env)
  const paths = (
    await Promise.all(
      globs.reduce((prev, glob) => {
        return prev.concat((0, import_fast_glob.default)(glob))
      }, [])
    )
  )
    .flatMap((paths2) => paths2)
    .filter((path) => extensions.includes((0, import_path.extname)(path)))
    .sort()
  if (paths.length === 0) {
    throw new Error(`No report files found. Please check your globs: ${JSON.stringify(globs)}`)
  }
  return Promise.all(paths.map((path) => publishFile(path, url, ciEnv, authHeaders)))
}
async function publishFile(path, url, ciEnv, authHeaders) {
  return new Promise((resolve, reject) => {
    lstat(path)
      .then((stat) => {
        let h
        switch (url.protocol) {
          case 'http:':
            h = import_http.default
            break
          case 'https:':
            h = import_https.default
            break
          default:
            return reject(new Error(`Unsupported protocol: ${url.toString()}`))
        }
        const headers = {
          'Content-Type': contentTypes[(0, import_path.extname)(path)],
          'Content-Length': stat.size,
          ...(ciEnv?.git?.remote ? { 'OneReport-SourceControl': ciEnv.git.remote } : {}),
          ...(ciEnv?.git?.revision ? { 'OneReport-Revision': ciEnv.git.revision } : {}),
          ...(ciEnv?.git?.branch ? { 'OneReport-Branch': ciEnv.git.branch } : {}),
          ...(ciEnv?.git?.tag ? { 'OneReport-Tag': ciEnv.git.tag } : {}),
          ...authHeaders,
        }
        const req = h.request(
          url.toString(),
          {
            method: 'POST',
            headers,
          },
          (res) => {
            if (res.statusCode !== 201) {
              return reject(
                new Error(`Unexpected status code ${res.statusCode}
POST ${url.toString()} -d @${path}
> ${Object.entries(headers)
                  .map(([h2, v]) => `${h2}: ${v}`)
                  .join('\n> ')}

< ${Object.entries(res.headers)
                  .map(([h2, v]) => `${h2}: ${v}`)
                  .join('\n< ')}
`)
              )
            }
            readStream(res)
              .then((buffer) => {
                try {
                  const responseBody = JSON.parse(buffer.toString('utf-8'))
                  return resolve(responseBody)
                } catch (err) {
                  reject(err)
                }
              })
              .catch(reject)
          }
        )
        req.on('error', reject)
        const file = import_fs.default.createReadStream(path)
        ;(0, import_stream.pipeline)(file, req, (err) => {
          try {
            if (err) return reject(err)
          } finally {
            req.end()
          }
        })
      })
      .catch(reject)
  })
}

// src/vercelAuthenticator.ts
var import_https2 = __toESM(require('https'), 1)
function vercelAuthenticator(url, vercelPassword) {
  return () =>
    new Promise((resolve, reject) => {
      const req = import_https2.default.request(
        url,
        {
          method: 'POST',
        },
        (res) => {
          const setCookie = res.headers['set-cookie']
          if (!setCookie || setCookie.length === 0) return reject(new Error('No cookie'))
          const parts = setCookie[0].split(';').filter((s) => !!s.trim())
          if (parts.length === 0) return reject(new Error(`Bad cookie: ${setCookie[0]}`))
          const cookie = parts[0]
          return resolve({
            Cookie: cookie,
          })
        }
      )
      req.on('error', reject)
      req.write(`_vercel_password=${vercelPassword}`)
      req.end()
    })
}

// src/bin/one-report-publisher.ts
var import_url2 = require('url')
var program = new import_commander.Command()
program.requiredOption('-o, --organization-id <id>', 'OneReport organization id')
program.requiredOption('-p, --password <password>', 'OneReport password')
program.requiredOption('-r, --reports <glob...>', 'Glob to the files to publish')
program.option('-u, --url <url>', 'OneReport URL', 'https://one-report.vercel.app')
async function main() {
  program.parse(process.argv)
  const { organizationId, password, reports: globs, url: baseUrl } = program.opts()
  const responseBodies = await publish(
    globs,
    organizationId,
    baseUrl,
    process.env,
    vercelAuthenticator(baseUrl, password)
  )
  return responseBodies.map((body) =>
    new import_url2.URL(
      `/organization/${organizationId}/executions/${body.testSetExecutionId}`,
      baseUrl
    ).toString()
  )
}
main()
  .then((reportUrls) => {
    console.log('Report URLs')
    for (const reportUrl of reportUrls) {
      console.log(`- ${reportUrl}`)
    }
  })
  .catch((error) => {
    console.error(error.stack)
    process.exit(1)
  })
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
