'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactHookForm = require('react-hook-form');
var core = require('@material-ui/core');
var styles = require('@material-ui/core/styles');
var icons = require('@material-ui/icons');
var _ = require('lodash');
var lab = require('@material-ui/lab');
var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var require$$0$1 = require('react-with-styles-interface-css');
var require$$0 = require('react-with-styles/lib/ThemedStyleSheet');
require('react-dates/lib/css/_datepicker.css');
var reactDates = require('react-dates');
var moment = require('moment');
var shineout = require('shineout');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ___default = /*#__PURE__*/_interopDefaultLegacy(_);
var _interopRequireDefault__default = /*#__PURE__*/_interopDefaultLegacy(_interopRequireDefault);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var moment__namespace = /*#__PURE__*/_interopNamespace(moment);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var formContext = /*#__PURE__*/React.createContext({});
var FormProvider = formContext.Provider;
var useFormContext = function useFormContext() {
  return React.useContext(formContext);
};

function Form(_a) {
  var onSubmit = _a.onSubmit,
      children = _a.children,
      _a$defaultValues = _a.defaultValues,
      defaultValues = _a$defaultValues === void 0 ? {} : _a$defaultValues,
      otherProps = __rest(_a, ["onSubmit", "children", "defaultValues"]);

  var _useForm = reactHookForm.useForm({
    mode: 'onSubmit',
    defaultValues: defaultValues
  }),
      unregister = _useForm.unregister,
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch,
      errors = _useForm.errors,
      reset = _useForm.reset,
      trigger = _useForm.trigger,
      setValue = _useForm.setValue,
      getValues = _useForm.getValues,
      control = _useForm.control,
      setError = _useForm.setError,
      clearErrors = _useForm.clearErrors;

  var HOC_submit = function HOC_submit(Fn) {
    return function () {
      Fn(watch());
    };
  }; // !mark: change the fieldsVal to be watch(), tend to get real vals


  console.log(watch());
  return /*#__PURE__*/React__default['default'].createElement(FormProvider //@ts-ignore[1]
  , {
    //@ts-ignore[1]
    value: {
      unregister: unregister,
      register: register,
      errors: errors,
      setValue: setValue,
      getValues: getValues,
      trigger: trigger,
      control: control,
      watch: watch,
      reset: reset,
      setError: setError,
      clearErrors: clearErrors,
      defaultValues: defaultValues
    }
  }, /*#__PURE__*/React__default['default'].createElement("form", Object.assign({
    onSubmit: handleSubmit(HOC_submit(onSubmit))
  }, otherProps), children));
} // todo 封装渲染render方法
// todo 统一起来所有的dependonField 和 affectField 关联关系，在form中，可以尝试useEffect

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function TipLabel(_ref) {
  var required = _ref.required,
      label = _ref.label,
      tips = _ref.tips;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", null, (required ? '* ' : '') + label), /*#__PURE__*/React__default['default'].createElement(core.Tooltip, {
    title: /*#__PURE__*/React__default['default'].createElement("pre", {
      style: {
        marginBottom: 0,
        whiteSpace: 'break-spaces'
      }
    }, tips)
  }, /*#__PURE__*/React__default['default'].createElement(icons.ErrorOutline, {
    style: {
      fontSize: 'inherit',
      marginLeft: '.25rem'
    }
  })));
}

var StyledTexfield = styles.withStyles({
  root: {
    "& .MuiInputLabel-root": {
      pointerEvents: "unset"
    }
  }
})(core.TextField);
function LiteFieldText(_a) {
  var name = _a.name,
      _a$multiline = _a.multiline,
      multiline = _a$multiline === void 0 ? false : _a$multiline,
      _a$rowsMax = _a.rowsMax,
      rowsMax = _a$rowsMax === void 0 ? 4 : _a$rowsMax,
      label = _a.label,
      defaultValue = _a.defaultValue,
      _a$disabled = _a.disabled,
      disabled = _a$disabled === void 0 ? false : _a$disabled,
      _a$autoFocus = _a.autoFocus,
      autoFocus = _a$autoFocus === void 0 ? false : _a$autoFocus,
      _a$placeholder = _a.placeholder,
      placeholder = _a$placeholder === void 0 ? "Input" : _a$placeholder,
      _a$registerConfig = _a.registerConfig,
      registerConfig = _a$registerConfig === void 0 ? {
    required: false
  } : _a$registerConfig,
      _a$tips = _a.tips,
      tips = _a$tips === void 0 ? "" : _a$tips,
      affectFields = _a.affectFields,
      dependOnFields = _a.dependOnFields,
      otherProps = __rest(_a, ["name", "multiline", "rowsMax", "label", "defaultValue", "disabled", "autoFocus", "placeholder", "registerConfig", "tips", "affectFields", "dependOnFields"]);

  function isKeyofInputElement(prop) {
    return prop in HTMLInputElement.prototype;
  }

  var _useFormContext = useFormContext(),
      watch = _useFormContext.watch,
      errors = _useFormContext.errors,
      setValue = _useFormContext.setValue,
      trigger = _useFormContext.trigger,
      control = _useFormContext.control,
      clearErrors = _useFormContext.clearErrors; // *compatible register config


  var RegisterConfigMemo = React.useMemo(function () {
    return registerConfig instanceof Function ? registerConfig(watch()) : registerConfig;
  }, [registerConfig, watch()]);
  var required = RegisterConfigMemo.required; // *force to change require message to 'Input cannot be empty!'

  if (required === true) registerConfig = Object.assign(Object.assign({}, registerConfig), {
    required: "Input cannot be empty!"
  }); // *set Label

  var labelNode = (required ? "* " : "") + label;
  if (tips) labelNode = /*#__PURE__*/React__default['default'].createElement(TipLabel, {
    required: Boolean(required),
    label: label,
    tips: tips
  }); // *compatible disabled data-type

  var DisabledMemo = React.useMemo(function () {
    return disabled instanceof Function ? disabled(watch()) : disabled;
  }, [watch()]);
  React.useEffect(function () {
    if (DisabledMemo) clearErrors(name);
    return function () {};
  }, [DisabledMemo]);
  var rules = React.useMemo(function () {
    return DisabledMemo ? {} : registerConfig;
  }, [DisabledMemo, registerConfig]);
  return /*#__PURE__*/React__default['default'].createElement(reactHookForm.Controller, {
    name: name,
    control: control,
    rules: rules,
    defaultValue: defaultValue ? defaultValue : "",
    render: function render(props) {
      return /*#__PURE__*/React__default['default'].createElement(StyledTexfield, {
        value: props.value,
        multiline: multiline,
        rowsMax: rowsMax,
        fullWidth: true,
        disabled: DisabledMemo,
        label: labelNode,
        placeholder: placeholder,
        autoFocus: autoFocus,
        onChange: function onChange(v) {
          setValue(name, v.target.value);

          if (affectFields && affectFields instanceof Array) {
            affectFields.forEach(function (f) {
              setValue(f, null);
            });
          }

          trigger(name);
          dependOnFields && clearErrors(dependOnFields); // *in case for situation like two fields can't be same
        },
        error: Boolean(errors[name]),
        helperText: /*#__PURE__*/React__default['default'].createElement("span", {
          style: {
            position: "absolute"
          }
        }, errors[name] ? errors[name].message : ""),
        variant: "outlined",
        inputProps: Object.keys(otherProps).reduce(function (r, c) {
          return isKeyofInputElement(c) ? Object.assign(Object.assign({}, r), _defineProperty({}, c, otherProps[c])) : r;
        }, {}),
        InputProps: {
          startAdornment: /*#__PURE__*/React__default['default'].createElement("span", null)
        }
      });
    }
  });
}

var CreateCompatibleValueFC$1 = function CreateCompatibleValueFC(optionsObj) {
  return function (val) {
    var _a;

    return typeof val === 'string' || typeof val === 'boolean' ? val : val && ((_a = optionsObj.find(function (o) {
      return o.value === val.value;
    })) === null || _a === void 0 ? void 0 : _a.value);
  };
};

function QueryFieldSelect(_a) {
  var _b;

  var name = _a.name,
      label = _a.label,
      _a$placeholder = _a.placeholder,
      placeholder = _a$placeholder === void 0 ? 'Select' : _a$placeholder,
      tips = _a.tips,
      _a$optionsData = _a.optionsData,
      optionsData = _a$optionsData === void 0 ? [] : _a$optionsData,
      defaultValue = _a.defaultValue,
      disabled = _a.disabled,
      _a$autoFocus = _a.autoFocus,
      autoFocus = _a$autoFocus === void 0 ? false : _a$autoFocus,
      registerConfig = _a.registerConfig,
      affectFields = _a.affectFields,
      dependOnFields = _a.dependOnFields,
      otherProps = __rest(_a, ["name", "label", "placeholder", "tips", "optionsData", "defaultValue", "disabled", "autoFocus", "registerConfig", "affectFields", "dependOnFields"]);

  function isKeyofInputElement(prop) {
    return prop in HTMLSelectElement.prototype;
  }

  var _useFormContext = useFormContext(),
      errors = _useFormContext.errors,
      trigger = _useFormContext.trigger,
      setValue = _useFormContext.setValue,
      control = _useFormContext.control,
      watch = _useFormContext.watch,
      clearErrors = _useFormContext.clearErrors; // *get options data depend on special fields' value


  var dependOnFieldsArray = React.useMemo(function () {
    return dependOnFields ? dependOnFields.map(function (f) {
      return watch()[f];
    }) : null;
  }, [watch()]); // todo fix the warning in devtool when get async option after component-rendered

  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      optionsDataState = _useState2[0],
      setOptionsDataState = _useState2[1];

  var compatibleValueFn = React.useCallback(CreateCompatibleValueFC$1(optionsDataState), [optionsDataState]);
  React.useEffect(function () {
    // !mark: use Promise to compatible whatever the (return of)optionData of parmas is an array or promise
    Promise.resolve(optionsData instanceof Function ? optionsData(watch()) : optionsData).then(function (res) {
      setOptionsDataState(res);
    });
    return function () {};
  }, [dependOnFieldsArray, optionsData, watch()]); // *compatible register config

  var RegisterConfigMemo = React.useMemo(function () {
    var configTemp = Object.assign({}, registerConfig instanceof Function ? registerConfig(watch()) : registerConfig);

    if (configTemp.required) {
      configTemp.required = false; // !mark: cause react-hook-form can't support value (boolean-false) validation, need to suppress native mandatory

      configTemp.validate = Object.assign(Object.assign({}, configTemp.validate), {
        empty: function empty(data) {
          return ___default['default'].some(optionsDataState, function (o) {
            return ___default['default'].isEqual(compatibleValueFn(data), o.value);
          }) || 'Select cannot be empty!';
        }
      });
    }

    return configTemp;
  }, [registerConfig, watch(), optionsDataState]); // *set Label

  var required = (_b = RegisterConfigMemo.validate) === null || _b === void 0 ? void 0 : _b.empty;
  var labelNode = React.useMemo(function () {
    return tips ? /*#__PURE__*/React__default['default'].createElement(TipLabel, {
      required: Boolean(required),
      label: label,
      tips: tips
    }) : (required ? '* ' : '') + label;
  }, [required]); // *compatible disabled data-type

  var DisabledMemo = React.useMemo(function () {
    return disabled instanceof Function ? disabled(watch()) : disabled;
  }, [dependOnFieldsArray]);
  React.useEffect(function () {
    if (DisabledMemo) clearErrors(name);
    return function () {};
  }, [DisabledMemo]); // *register config

  var rules = React.useMemo(function () {
    return DisabledMemo ? {} : RegisterConfigMemo;
  }, [DisabledMemo, RegisterConfigMemo]);
  return /*#__PURE__*/React__default['default'].createElement(reactHookForm.Controller, {
    defaultValue: defaultValue !== null && defaultValue !== void 0 ? defaultValue : '',
    control: control,
    name: name,
    rules: rules,
    render: function render(props) {
      var _a;

      return /*#__PURE__*/React__default['default'].createElement(core.TextField, {
        value: (_a = compatibleValueFn(props.value)) !== null && _a !== void 0 ? _a : '',
        fullWidth: true,
        select: true,
        name: name,
        disabled: DisabledMemo,
        label: labelNode,
        autoFocus: autoFocus,
        variant: "outlined",
        onChange: function onChange(e) {
          setValue(name, e.target.value);

          if (affectFields && affectFields instanceof Array) {
            affectFields.forEach(function (f) {
              setValue(f, null);
            });
          }

          trigger(name);
        },
        error: Boolean(errors[name]),
        helperText: /*#__PURE__*/React__default['default'].createElement("span", {
          style: {
            position: 'absolute'
          }
        }, errors[name] ? errors[name].message : ''),
        InputLabelProps: {
          shrink: true
        },
        SelectProps: {
          displayEmpty: true,
          renderValue: function renderValue(value) {
            var _a;

            if (optionsDataState.map(function (o) {
              return o.value;
            }).includes(value)) return (_a = optionsDataState.find(function (o) {
              return o.value === value;
            })) === null || _a === void 0 ? void 0 : _a.label;else return /*#__PURE__*/React__default['default'].createElement("span", {
              style: {
                color: 'rgba(0, 0, 0, 0.42)'
              }
            }, placeholder); //!mark: aim to show a placeholder like text-input
          }
        },
        inputProps: Object.keys(otherProps).reduce(function (r, c) {
          return isKeyofInputElement(c) ? Object.assign(Object.assign({}, r), _defineProperty({}, c, otherProps[c])) : r;
        }, {})
      }, ___default['default'].sortBy(optionsDataState, function (o) {
        return o.label;
      }).map(function (o) {
        return /*#__PURE__*/React__default['default'].createElement(core.MenuItem, {
          key: String(o.value),
          // @ts-ignore [1]
          value: o.value,
          disabled: o.disabled
        }, o.label);
      }));
    }
  });
}

var StyledTextField = styles.withStyles({
  root: {
    '& .MuiInputLabel-outlined': {
      pointerEvents: 'unset'
    }
  }
})(core.TextField); // const CreateCompatibleValueFC = (optionsObj: Array<OptionDataObj>) => (
//   val: string | OptionDataObj | boolean,
// ) => {
//   return typeof val === 'string' || typeof val === 'boolean'
//     ? val
//     : val && optionsObj.find(o => o.value === val.value)?.value;
// };

function FieldAutoInput(_a) {
  var _b;

  var name = _a.name,
      label = _a.label,
      _a$multiple = _a.multiple,
      multiple = _a$multiple === void 0 ? false : _a$multiple,
      optionsData = _a.optionsData,
      defaultValue = _a.defaultValue,
      disabled = _a.disabled,
      _a$placeholder = _a.placeholder,
      placeholder = _a$placeholder === void 0 ? 'Input' : _a$placeholder,
      tips = _a.tips,
      _a$registerConfig = _a.registerConfig,
      registerConfig = _a$registerConfig === void 0 ? {
    required: false
  } : _a$registerConfig,
      affectFields = _a.affectFields,
      dependOnFields = _a.dependOnFields;
      __rest(_a, ["name", "label", "multiple", "optionsData", "defaultValue", "disabled", "placeholder", "tips", "registerConfig", "affectFields", "dependOnFields"]);

  var _useFormContext = useFormContext(),
      watch = _useFormContext.watch,
      errors = _useFormContext.errors,
      setValue = _useFormContext.setValue,
      trigger = _useFormContext.trigger,
      control = _useFormContext.control,
      clearErrors = _useFormContext.clearErrors; // *get options data depend on special fields' value


  var dependOnFieldsArray = React.useMemo(function () {
    return dependOnFields ? dependOnFields.map(function (f) {
      return watch()[f];
    }) : null;
  }, [watch()]);

  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      optionsDataState = _useState2[0],
      setOptionsDataState = _useState2[1]; // const compatibleValueFn = useCallback(
  //   CreateCompatibleValueFC(optionsDataState),
  //   [optionsDataState],
  // );


  React.useEffect(function () {
    // !mark: use Promise to compatible whatever the (return of)optionData of parmas is an array or promise
    Promise.resolve(optionsData instanceof Function ? optionsData(watch()) : optionsData).then(function (res) {
      setOptionsDataState(res);
    });
    return function () {};
  }, [dependOnFieldsArray]); // *compatible register config

  var RegisterConfigMemo = React.useMemo(function () {
    var configTemp = Object.assign({}, registerConfig instanceof Function ? registerConfig(watch()) : registerConfig);

    if (configTemp.required) {
      configTemp.required = false; // !mark: cause react-hook-form can't support value (boolean-false) validation, need to suppress native mandatory

      configTemp.validate = Object.assign(Object.assign({}, configTemp.validate), {
        empty: function empty(data) {
          return ___default['default'].some(optionsDataState, function (o) {
            return ___default['default'].isEqual(data, o.value);
          }) || 'Input cannot be empty!';
        }
      });
    }

    return configTemp;
  }, [registerConfig, watch(), optionsDataState]); // *set Label

  var required = (_b = RegisterConfigMemo.validate) === null || _b === void 0 ? void 0 : _b.empty;
  var labelNode = React.useMemo(function () {
    return tips ? /*#__PURE__*/React__default['default'].createElement(TipLabel, {
      required: Boolean(required),
      label: label,
      tips: tips
    }) : (required ? '* ' : '') + label;
  }, [required]); // *compatible disabled data-type

  var DisabledMemo = React.useMemo(function () {
    return disabled instanceof Function ? disabled(watch()) : disabled;
  }, [dependOnFieldsArray]);
  React.useEffect(function () {
    if (DisabledMemo) clearErrors(name);
    return function () {};
  }, [DisabledMemo]); // *register config

  var rules = React.useMemo(function () {
    return DisabledMemo ? {} : RegisterConfigMemo;
  }, [DisabledMemo, RegisterConfigMemo]);
  return /*#__PURE__*/React__default['default'].createElement(reactHookForm.Controller, {
    name: name,
    control: control,
    rules: rules,
    defaultValue: defaultValue !== null && defaultValue !== void 0 ? defaultValue : multiple ? [] : null,
    render: function render(props) {
      return /*#__PURE__*/React__default['default'].createElement(lab.Autocomplete, {
        multiple: multiple,
        value: props.value,
        disabled: DisabledMemo,
        options: ___default['default'].sortBy(optionsDataState, function (o) {
          return o.label;
        }).map(function (o) {
          return o.value;
        }),
        filterSelectedOptions: true,
        onChange: function onChange(e, v, reason) {
          console.log(v, reason);
          setValue(name, v);

          if (affectFields && affectFields instanceof Array) {
            affectFields.forEach(function (f) {
              setValue(f, null);
            });
          }

          trigger(name);
          dependOnFields && clearErrors(dependOnFields); // *in case for situation like two fields can't be same
        },
        renderInput: function renderInput(params) {
          return /*#__PURE__*/React__default['default'].createElement(StyledTextField, Object.assign({}, params, {
            variant: "outlined",
            label: labelNode,
            placeholder: placeholder,
            error: Boolean(errors[name]),
            helperText: /*#__PURE__*/React__default['default'].createElement("span", {
              style: {
                position: 'absolute'
              }
            }, errors[name] ? errors[name].message : ''),
            InputProps: Object.assign(Object.assign({}, params.InputProps), {
              startAdornment: /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("span", null), params.InputProps.startAdornment)
            })
          }));
        },
        getOptionLabel: function getOptionLabel(x) {
          var _a, _b; // todo
          // !mark: there is a bug in Material-UI@v4 https://github.com/mui-org/material-ui/issues/19173#issuecomment-786109015;
          // !mark: so if the async options later than component-mounted, just to use the value-string


          return (_b = (_a = optionsDataState.find(function (o) {
            return o.value === x;
          })) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : String(x);
        },
        getOptionSelected: function getOptionSelected(option, value) {
          return ___default['default'].isEqual(value, option);
        }
      });
    }
  });
}

var CreateCompatibleValueFC = function CreateCompatibleValueFC(optionsObj) {
  return function (val) {
    var _a;

    return typeof val === 'string' || typeof val === 'boolean' ? val : val && ((_a = optionsObj.find(function (o) {
      return o.value === val.value;
    })) === null || _a === void 0 ? void 0 : _a.value);
  };
};

function FieldRadio(_a) {
  var _b;

  var name = _a.name,
      label = _a.label,
      _a$optionsData = _a.optionsData,
      optionsData = _a$optionsData === void 0 ? [] : _a$optionsData,
      defaultValue = _a.defaultValue,
      tips = _a.tips,
      _a$disabled = _a.disabled,
      disabled = _a$disabled === void 0 ? false : _a$disabled,
      _a$autoFocus = _a.autoFocus,
      autoFocus = _a$autoFocus === void 0 ? false : _a$autoFocus,
      registerConfig = _a.registerConfig,
      affectFields = _a.affectFields,
      dependOnFields = _a.dependOnFields,
      otherProps = __rest(_a, ["name", "label", "optionsData", "defaultValue", "tips", "disabled", "autoFocus", "registerConfig", "affectFields", "dependOnFields"]);

  function isKeyofInputElement(prop) {
    return prop in HTMLInputElement.prototype;
  }

  var _useFormContext = useFormContext(),
      watch = _useFormContext.watch,
      errors = _useFormContext.errors,
      trigger = _useFormContext.trigger,
      setValue = _useFormContext.setValue,
      control = _useFormContext.control,
      clearErrors = _useFormContext.clearErrors; // *get options data depend on special fields' value


  var dependOnFieldsArray = React.useMemo(function () {
    return dependOnFields ? dependOnFields.map(function (f) {
      return watch()[f];
    }) : null;
  }, [watch()]);

  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      optionsDataState = _useState2[0],
      setOptionsDataState = _useState2[1];

  var compatibleValueFn = React.useCallback(CreateCompatibleValueFC(optionsDataState), [optionsDataState]);
  React.useEffect(function () {
    // !mark: use Promise to compatible whatever the (return of)optionData of parmas is an array or promise
    Promise.resolve(optionsData instanceof Function ? optionsData(watch()) : optionsData).then(function (res) {
      setOptionsDataState(res);
    });
    return function () {};
  }, [dependOnFieldsArray]); // *compatible register config

  var RegisterConfigMemo = React.useMemo(function () {
    var configTemp = Object.assign({}, registerConfig instanceof Function ? registerConfig(watch()) : registerConfig);

    if (configTemp.required) {
      configTemp.required = false; // !mark: cause react-hook-form can't support value (boolean-false) validation, need to suppress native mandatory

      configTemp.validate = Object.assign(Object.assign({}, configTemp.validate), {
        empty: function empty(data) {
          return ___default['default'].some(optionsDataState, function (o) {
            return ___default['default'].isEqual(compatibleValueFn(data), o.value);
          }) || 'Radio cannot be empty!';
        }
      });
    }

    return configTemp;
  }, [registerConfig, watch(), optionsDataState]); // *set Label

  var required = (_b = RegisterConfigMemo.validate) === null || _b === void 0 ? void 0 : _b.empty;
  var labelNode = React.useMemo(function () {
    return tips ? /*#__PURE__*/React__default['default'].createElement(TipLabel, {
      required: Boolean(required),
      label: label,
      tips: tips
    }) : (required ? '* ' : '') + label;
  }, [required]); // *compatible disabled data-type

  var DisabledMemo = React.useMemo(function () {
    return disabled instanceof Function ? disabled(watch()) : disabled;
  }, [dependOnFieldsArray]);
  React.useEffect(function () {
    if (DisabledMemo) clearErrors(name);
    return function () {};
  }, [DisabledMemo]); // *register config

  var rules = React.useMemo(function () {
    return DisabledMemo ? {} : RegisterConfigMemo;
  }, [DisabledMemo, RegisterConfigMemo]);
  return /*#__PURE__*/React__default['default'].createElement(reactHookForm.Controller, {
    name: name,
    defaultValue: defaultValue !== null && defaultValue !== void 0 ? defaultValue : '',
    control: control,
    rules: rules,
    render: function render(props) {
      return /*#__PURE__*/React__default['default'].createElement(core.FormControl, {
        component: "fieldset",
        error: Boolean(errors[name]),
        style: {
          width: '100%'
        }
      }, /*#__PURE__*/React__default['default'].createElement(core.FormLabel, {
        component: "legend"
      }, labelNode), /*#__PURE__*/React__default['default'].createElement(core.Grid, {
        container: true,
        justify: "space-between"
      }, optionsDataState.map(function (o) {
        var _a;

        return /*#__PURE__*/React__default['default'].createElement(core.FormControlLabel, {
          key: String(o.value),
          control: /*#__PURE__*/React__default['default'].createElement(core.Radio, {
            color: "primary",
            checked: ___default['default'].isEqual(compatibleValueFn(props.value), o.value),
            value: (_a = compatibleValueFn(props.value)) !== null && _a !== void 0 ? _a : '',
            name: name,
            autoFocus: autoFocus,

            /** start: support cancel radio checked */
            onClick: function onClick() {
              if (___default['default'].isEqual(compatibleValueFn(props.value), o.value)) setValue(name, '');else setValue(name, o.value);

              if (affectFields && affectFields instanceof Array) {
                affectFields.forEach(function (f) {
                  setValue(f, null);
                });
              }

              trigger(name);
            },
            inputProps: Object.keys(otherProps).reduce(function (r, c) {
              return isKeyofInputElement(c) ? Object.assign(Object.assign({}, r), _defineProperty({}, c, otherProps[c])) : r;
            }, {})
          }),
          label: o.label,
          disabled: DisabledMemo || o.disabled
        });
      })), /*#__PURE__*/React__default['default'].createElement(core.FormHelperText, null, /*#__PURE__*/React__default['default'].createElement("span", {
        style: {
          position: 'absolute'
        }
      }, errors[name] ? errors[name].message : '')));
    }
  });
}

var StyledFormLabel = core.withStyles(function (theme) {
  return {
    root: {
      // fontSize: '0.75em',
      transform: 'translate(0, -50%)',
      zIndex: 6,
      // pointerEvents: 'none',
      background: '#FFF',
      padding: '0 5px',
      position: 'absolute',
      top: 0,
      left: '8px',
      display: 'inline-block',
      width: 'auto'
    }
  };
})(core.FormLabel);

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var DefaultTheme = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var core = {
  white: '#fff',
  gray: '#484848',
  grayLight: '#82888a',
  grayLighter: '#cacccd',
  grayLightest: '#f2f2f2',
  borderMedium: '#c4c4c4',
  border: '#dbdbdb',
  borderLight: '#e4e7e7',
  borderLighter: '#eceeee',
  borderBright: '#f4f5f5',
  primary: '#00a699',
  primaryShade_1: '#33dacd',
  primaryShade_2: '#66e2da',
  primaryShade_3: '#80e8e0',
  primaryShade_4: '#b2f1ec',
  primary_dark: '#008489',
  secondary: '#007a87',
  yellow: '#ffe8bc',
  yellow_dark: '#ffce71'
};
var _default = {
  reactDates: {
    zIndex: 0,
    border: {
      input: {
        border: 0,
        borderTop: 0,
        borderRight: 0,
        borderBottom: '2px solid transparent',
        borderLeft: 0,
        outlineFocused: 0,
        borderFocused: 0,
        borderTopFocused: 0,
        borderLeftFocused: 0,
        borderBottomFocused: "2px solid ".concat(core.primary_dark),
        borderRightFocused: 0,
        borderRadius: 0
      },
      pickerInput: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 2
      }
    },
    color: {
      core: core,
      disabled: core.grayLightest,
      background: core.white,
      backgroundDark: '#f2f2f2',
      backgroundFocused: core.white,
      border: 'rgb(219, 219, 219)',
      text: core.gray,
      textDisabled: core.border,
      textFocused: '#007a87',
      placeholderText: '#757575',
      outside: {
        backgroundColor: core.white,
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        color: core.gray,
        color_active: core.gray,
        color_hover: core.gray
      },
      highlighted: {
        backgroundColor: core.yellow,
        backgroundColor_active: core.yellow_dark,
        backgroundColor_hover: core.yellow_dark,
        color: core.gray,
        color_active: core.gray,
        color_hover: core.gray
      },
      minimumNights: {
        backgroundColor: core.white,
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        borderColor: core.borderLighter,
        color: core.grayLighter,
        color_active: core.grayLighter,
        color_hover: core.grayLighter
      },
      hoveredSpan: {
        backgroundColor: core.primaryShade_4,
        backgroundColor_active: core.primaryShade_3,
        backgroundColor_hover: core.primaryShade_4,
        borderColor: core.primaryShade_3,
        borderColor_active: core.primaryShade_3,
        borderColor_hover: core.primaryShade_3,
        color: core.secondary,
        color_active: core.secondary,
        color_hover: core.secondary
      },
      selectedSpan: {
        backgroundColor: core.primaryShade_2,
        backgroundColor_active: core.primaryShade_1,
        backgroundColor_hover: core.primaryShade_1,
        borderColor: core.primaryShade_1,
        borderColor_active: core.primary,
        borderColor_hover: core.primary,
        color: core.white,
        color_active: core.white,
        color_hover: core.white
      },
      selected: {
        backgroundColor: core.primary,
        backgroundColor_active: core.primary,
        backgroundColor_hover: core.primary,
        borderColor: core.primary,
        borderColor_active: core.primary,
        borderColor_hover: core.primary,
        color: core.white,
        color_active: core.white,
        color_hover: core.white
      },
      blocked_calendar: {
        backgroundColor: core.grayLighter,
        backgroundColor_active: core.grayLighter,
        backgroundColor_hover: core.grayLighter,
        borderColor: core.grayLighter,
        borderColor_active: core.grayLighter,
        borderColor_hover: core.grayLighter,
        color: core.grayLight,
        color_active: core.grayLight,
        color_hover: core.grayLight
      },
      blocked_out_of_range: {
        backgroundColor: core.white,
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        borderColor: core.borderLight,
        borderColor_active: core.borderLight,
        borderColor_hover: core.borderLight,
        color: core.grayLighter,
        color_active: core.grayLighter,
        color_hover: core.grayLighter
      }
    },
    spacing: {
      dayPickerHorizontalPadding: 9,
      captionPaddingTop: 22,
      captionPaddingBottom: 37,
      inputPadding: 0,
      displayTextPaddingVertical: undefined,
      displayTextPaddingTop: 11,
      displayTextPaddingBottom: 9,
      displayTextPaddingHorizontal: undefined,
      displayTextPaddingLeft: 11,
      displayTextPaddingRight: 11,
      displayTextPaddingVertical_small: undefined,
      displayTextPaddingTop_small: 7,
      displayTextPaddingBottom_small: 5,
      displayTextPaddingHorizontal_small: undefined,
      displayTextPaddingLeft_small: 7,
      displayTextPaddingRight_small: 7
    },
    sizing: {
      inputWidth: 130,
      inputWidth_small: 97,
      arrowWidth: 24
    },
    noScrollBarOnVerticalScrollable: false,
    font: {
      size: 14,
      captionSize: 18,
      input: {
        size: 19,
        weight: 200,
        lineHeight: '24px',
        size_small: 15,
        lineHeight_small: '18px',
        letterSpacing_small: '0.2px',
        styleDisabled: 'italic'
      }
    }
  }
};
exports["default"] = _default;
});

var registerInterfaceWithDefaultTheme_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = registerInterfaceWithDefaultTheme;

var _ThemedStyleSheet = _interopRequireDefault__default['default'](require$$0__default['default']);

var _DefaultTheme = _interopRequireDefault__default['default'](DefaultTheme);

function registerInterfaceWithDefaultTheme(reactWithStylesInterface) {
  _ThemedStyleSheet["default"].registerInterface(reactWithStylesInterface);

  _ThemedStyleSheet["default"].registerTheme(_DefaultTheme["default"]);
}
});

var registerCSSInterfaceWithDefaultTheme_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = registerCSSInterfaceWithDefaultTheme;

var _reactWithStylesInterfaceCss = _interopRequireDefault__default['default'](require$$0__default$1['default']);

var _registerInterfaceWithDefaultTheme = _interopRequireDefault__default['default'](registerInterfaceWithDefaultTheme_1);

function registerCSSInterfaceWithDefaultTheme() {
  (0, _registerInterfaceWithDefaultTheme["default"])(_reactWithStylesInterfaceCss["default"]);
}
});

var _registerCSSInterfaceWithDefaultTheme = _interopRequireDefault__default['default'](registerCSSInterfaceWithDefaultTheme_1);

(0, _registerCSSInterfaceWithDefaultTheme["default"])();

function ReactDateRangePicker(_ref) {
  var timeRangeObj = _ref.timeRangeObj,
      name = _ref.name,
      affectFields = _ref.affectFields;

  var _a, _b;

  var _useContext = React.useContext(formContext),
      setValue = _useContext.setValue,
      trigger = _useContext.trigger;

  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      focusedInput = _useState2[0],
      setFocusedInput = _useState2[1];

  var uploadNewDate = function uploadNewDate(_ref2) {
    var startDate = _ref2.startDate,
        endDate = _ref2.endDate;
    setValue(name, {
      startDate: startDate ? moment__namespace.utc(startDate.format("YYYY-MM-DD")) : startDate,
      endDate: endDate ? moment__namespace.utc(endDate.format("YYYY-MM-DD")).set({
        hour: 23,
        minute: 59,
        second: 59
      }) : endDate
    });

    if (affectFields && affectFields instanceof Array) {
      affectFields.forEach(function (f) {
        setValue(f, null);
      });
    }

    trigger(name);
  };

  return /*#__PURE__*/React__default['default'].createElement(reactDates.DateRangePicker, {
    block: true,
    appendToBody: true,
    showClearDates: true,
    reopenPickerOnClearDates: true,
    hideKeyboardShortcutsPanel: true,
    noBorder: true,
    numberOfMonths: 1,
    startDate: (_a = timeRangeObj.startDate) !== null && _a !== void 0 ? _a : null,
    startDateId: "".concat(name, "_start_date_id"),
    endDate: (_b = timeRangeObj.endDate) !== null && _b !== void 0 ? _b : null,
    endDateId: "".concat(name, "_end_date_id"),
    onDatesChange: uploadNewDate,
    focusedInput: focusedInput,
    onFocusChange: function onFocusChange(focusedInput) {
      return setFocusedInput(focusedInput);
    },
    // appendToBody
    isOutsideRange: function isOutsideRange() {
      return false;
    },
    minimumNights: 0
  });
}

function FieldDateRangePicker(_a) {
  var _b;

  var name = _a.name,
      disabled = _a.disabled,
      label = _a.label,
      defaultValue = _a.defaultValue,
      registerConfig = _a.registerConfig,
      tips = _a.tips,
      affectFields = _a.affectFields,
      dependOnFields = _a.dependOnFields;
      __rest(_a, ["name", "disabled", "label", "defaultValue", "registerConfig", "tips", "affectFields", "dependOnFields"]);

  var _useContext2 = React.useContext(formContext),
      watch = _useContext2.watch,
      errors = _useContext2.errors,
      clearErrors = _useContext2.clearErrors;
      _useContext2.setValue;
      _useContext2.trigger;
      var control = _useContext2.control; // *define Fields-value Array depend on special fields' value


  var dependOnFieldsArray = React.useMemo(function () {
    return dependOnFields ? dependOnFields.map(function (f) {
      return watch()[f];
    }) : undefined;
  }, [watch()]); // *compatible disabled data-type

  var DisabledMemo = React.useMemo(function () {
    return disabled instanceof Function ? disabled(watch()) : disabled;
  }, [dependOnFieldsArray]);
  React.useEffect(function () {
    if (DisabledMemo) clearErrors(name);
    return function () {};
  }, [DisabledMemo]); // *compatible register config

  var RegisterConfigMemo = React.useMemo(function () {
    return Object.assign({}, registerConfig instanceof Function ? registerConfig(watch()) : registerConfig);
  }, [registerConfig, watch()]); // *set Label

  var required = (_b = RegisterConfigMemo.validate) === null || _b === void 0 ? void 0 : _b.empty;
  var labelNode = React.useMemo(function () {
    return tips ? /*#__PURE__*/React__default['default'].createElement(TipLabel, {
      required: Boolean(required),
      label: label,
      tips: tips
    }) : (required ? "* " : "") + label;
  }, [required]); // *register config

  var rules = React.useMemo(function () {
    return DisabledMemo ? {} : RegisterConfigMemo;
  }, [DisabledMemo, RegisterConfigMemo]);
  return /*#__PURE__*/React__default['default'].createElement(reactHookForm.Controller, {
    control: control,
    name: name,
    defaultValue: defaultValue !== null && defaultValue !== void 0 ? defaultValue : {},
    rules: rules,
    render: function render(props) {
      return /*#__PURE__*/React__default['default'].createElement(core.FormControl, {
        component: "fieldset",
        error: Boolean(errors[name]),
        fullWidth: true
      }, /*#__PURE__*/React__default['default'].createElement(StyledFormLabel, {
        component: "legend"
      }, labelNode), /*#__PURE__*/React__default['default'].createElement(ReactDateRangePicker, {
        timeRangeObj: props.value,
        name: name,
        affectFields: affectFields
      }), /*#__PURE__*/React__default['default'].createElement(core.FormHelperText, null, /*#__PURE__*/React__default['default'].createElement("span", {
        style: {
          position: "absolute"
        }
      }, errors[name] ? errors[name].message : "")));
    }
  });
} // todo use @material-picker-beta
// or https://rsuitejs.com/components/date-range-picker/

function FiledDatePicker(_a) {
  var _b;

  var name = _a.name,
      disabled = _a.disabled,
      label = _a.label,
      _a$placeholder = _a.placeholder,
      placeholder = _a$placeholder === void 0 ? 'Search' : _a$placeholder,
      defaultValue = _a.defaultValue,
      registerConfig = _a.registerConfig,
      tips = _a.tips,
      affectFields = _a.affectFields,
      dependOnFields = _a.dependOnFields;
      __rest(_a, ["name", "disabled", "label", "placeholder", "defaultValue", "registerConfig", "tips", "affectFields", "dependOnFields"]);

  var _useFormContext = useFormContext(),
      watch = _useFormContext.watch,
      errors = _useFormContext.errors,
      clearErrors = _useFormContext.clearErrors,
      setValue = _useFormContext.setValue,
      trigger = _useFormContext.trigger,
      control = _useFormContext.control; // *define Fields-value Array depend on special fields' value


  var dependOnFieldsArray = React.useMemo(function () {
    return dependOnFields ? dependOnFields.map(function (f) {
      return watch()[f];
    }) : undefined;
  }, [watch()]);

  var uploadNewDate = function uploadNewDate(date) {
    setValue(name, date);
    trigger(name);
  }; // *compatible disabled data-type


  var DisabledMemo = React.useMemo(function () {
    return disabled instanceof Function ? disabled(watch()) : disabled;
  }, [dependOnFieldsArray]);
  React.useEffect(function () {
    if (DisabledMemo) clearErrors(name);
    return function () {};
  }, [DisabledMemo]); // *compatible register config

  var RegisterConfigMemo = React.useMemo(function () {
    return Object.assign({}, registerConfig instanceof Function ? registerConfig(watch()) : registerConfig);
  }, [registerConfig, watch()]); // *set Label

  var required = (_b = RegisterConfigMemo.validate) === null || _b === void 0 ? void 0 : _b.empty;
  var labelNode = React.useMemo(function () {
    return tips ? /*#__PURE__*/React__default['default'].createElement(TipLabel, {
      required: Boolean(required),
      label: label,
      tips: tips
    }) : (required ? '* ' : '') + label;
  }, [required]); // *register config

  var rules = React.useMemo(function () {
    return DisabledMemo ? {} : RegisterConfigMemo;
  }, [DisabledMemo, RegisterConfigMemo]);
  return /*#__PURE__*/React__default['default'].createElement(reactHookForm.Controller, {
    control: control,
    name: name,
    rules: rules,
    defaultValue: defaultValue !== null && defaultValue !== void 0 ? defaultValue : '',
    render: function render(props) {
      var _a;

      return /*#__PURE__*/React__default['default'].createElement(core.TextField, {
        label: labelNode,
        placeholder: placeholder,
        type: "date",
        variant: "outlined",
        value: (_a = props.value) !== null && _a !== void 0 ? _a : '',
        error: Boolean(errors[name]),
        helperText: /*#__PURE__*/React__default['default'].createElement("span", {
          style: {
            position: 'absolute'
          }
        }, errors[name] ? errors[name].message : ''),
        disabled: DisabledMemo,
        InputLabelProps: {
          shrink: true
        },
        onChange: function onChange(e) {
          uploadNewDate(e.target.value);

          if (affectFields && affectFields instanceof Array) {
            affectFields.forEach(function (f) {
              setValue(f, null);
            });
          }
        },
        InputProps: {
          endAdornment: /*#__PURE__*/React__default['default'].createElement(core.IconButton, {
            onClick: function onClick(e) {
              uploadNewDate(null);
            },
            disabled: DisabledMemo
          }, /*#__PURE__*/React__default['default'].createElement(icons.Close, {
            fontSize: "small"
          }))
        }
      });
    }
  });
} // todo use @material-picker-beta
// or https://rsuitejs.com/components/date-range-picker/

function FieldMultiCascaderSelect(_a) {
  var _b;

  var name = _a.name,
      label = _a.label,
      tips = _a.tips,
      _a$placeholder = _a.placeholder,
      placeholder = _a$placeholder === void 0 ? 'Select' : _a$placeholder,
      disabled = _a.disabled,
      optionsData = _a.optionsData,
      defaultValue = _a.defaultValue,
      registerConfig = _a.registerConfig,
      affectFields = _a.affectFields,
      dependOnFields = _a.dependOnFields;
      __rest(_a, ["name", "label", "tips", "placeholder", "disabled", "optionsData", "defaultValue", "registerConfig", "affectFields", "dependOnFields"]);

  var _useFormContext = useFormContext(),
      watch = _useFormContext.watch,
      errors = _useFormContext.errors,
      clearErrors = _useFormContext.clearErrors,
      setValue = _useFormContext.setValue,
      trigger = _useFormContext.trigger,
      control = _useFormContext.control; // *get options data depend on special fields' value


  var dependOnFieldsArray = React.useMemo(function () {
    return dependOnFields ? dependOnFields.map(function (f) {
      return watch()[f];
    }) : null;
  }, [watch()]); // todo fix the warning in devtool when get async option after component-rendered

  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      optionsDataState = _useState2[0],
      setOptionsDataState = _useState2[1];

  React.useEffect(function () {
    // !mark: use Promise to compatible whatever the (return of)optionData of parmas is an array or promise
    Promise.resolve(optionsData instanceof Function ? optionsData(watch()) : optionsData).then(function (res) {
      setOptionsDataState(res);
    });
    return function () {};
  }, [dependOnFieldsArray, optionsData, watch()]); // todo replace watch() with more accurate array list
  // *compatible register config

  var RegisterConfigMemo = React.useMemo(function () {
    var configTemp = Object.assign({}, registerConfig instanceof Function ? registerConfig(watch()) : registerConfig);
    return configTemp;
  }, [registerConfig, watch(), optionsDataState]); // *set Label

  var required = (_b = RegisterConfigMemo.validate) === null || _b === void 0 ? void 0 : _b.empty;
  var labelNode = React.useMemo(function () {
    return tips ? /*#__PURE__*/React__default['default'].createElement(TipLabel, {
      required: Boolean(required),
      label: label,
      tips: tips
    }) : (required ? '* ' : '') + label;
  }, [required]); // *compatible disabled data-type

  var DisabledMemo = React.useMemo(function () {
    return disabled instanceof Function ? disabled(watch()) : disabled;
  }, [dependOnFieldsArray]);
  React.useEffect(function () {
    if (DisabledMemo) clearErrors(name);
    return function () {};
  }, [DisabledMemo]); // *register config

  var rules = React.useMemo(function () {
    return DisabledMemo ? {} : RegisterConfigMemo;
  }, [DisabledMemo, RegisterConfigMemo]);

  var flattenNestArray = function flattenNestArray(nestedArray) {
    return nestedArray.reduce(function (r, c) {
      var _a;

      return [].concat(_toConsumableArray(r), [c], _toConsumableArray((_a = c.children) !== null && _a !== void 0 ? _a : []));
    }, []);
  }; // 2 level-mode nested array


  var uploadNewData = function uploadNewData(valueArray, selected) {
    setValue(name, flattenNestArray(optionsDataState).filter(function (i) {
      return valueArray.includes(i.value);
    }).map(function (i) {
      return i.value;
    }));

    if (affectFields && affectFields instanceof Array) {
      affectFields.forEach(function (f) {
        setValue(f, null);
      });
    }

    trigger(name);
  };

  return /*#__PURE__*/React__default['default'].createElement(reactHookForm.Controller, {
    control: control,
    name: name,
    defaultValue: defaultValue !== null && defaultValue !== void 0 ? defaultValue : [],
    rules: rules,
    render: function render(props) {
      console.log(props.value);
      return /*#__PURE__*/React__default['default'].createElement(core.FormControl, {
        component: "fieldset",
        error: Boolean(errors[name]),
        style: {
          width: '100%'
        }
      }, /*#__PURE__*/React__default['default'].createElement(StyledFormLabel, {
        component: "legend"
      }, labelNode), optionsDataState.length ? /*#__PURE__*/React__default['default'].createElement(shineout.Cascader, {
        placeholder: placeholder,
        data: optionsDataState,
        keygen: "value",
        mode: 2,
        expandTrigger: "hover",
        // @ts-ignore[1]
        disabled: DisabledMemo !== null && DisabledMemo !== void 0 ? DisabledMemo : false,
        clearable: false,
        value: props.value,
        onChange: uploadNewData,
        renderItem: function renderItem(_ref) {
          var label = _ref.label;
          return label;
        },
        renderResult: function renderResult(_ref2) {
          var label = _ref2.label;
          console.log(label);
          return /*#__PURE__*/React__default['default'].createElement(core.Chip, {
            key: label,
            label: label,
            style: {
              cursor: 'pointer'
            }
          });
        },
        className: "so-cascader-overrides",
        absolute: true
      }) : null, /*#__PURE__*/React__default['default'].createElement(core.FormHelperText, null, /*#__PURE__*/React__default['default'].createElement("span", {
        style: {
          position: 'absolute'
        }
      }, errors[name] ? errors[name].message : '')));
    }
  });
} // todo use https://rsuitejs.com/components/multi-cascader/

function FieldDateTimePicker(_a) {
  var _b;

  var name = _a.name,
      disabled = _a.disabled,
      _a$autoFocus = _a.autoFocus,
      autoFocus = _a$autoFocus === void 0 ? false : _a$autoFocus,
      label = _a.label,
      defaultValue = _a.defaultValue,
      _a$placeholder = _a.placeholder,
      placeholder = _a$placeholder === void 0 ? 'Search' : _a$placeholder,
      registerConfig = _a.registerConfig,
      tips = _a.tips,
      affectFields = _a.affectFields,
      dependOnFields = _a.dependOnFields;
      __rest(_a, ["name", "disabled", "autoFocus", "label", "defaultValue", "placeholder", "registerConfig", "tips", "affectFields", "dependOnFields"]);

  var _useFormContext = useFormContext(),
      watch = _useFormContext.watch,
      errors = _useFormContext.errors,
      clearErrors = _useFormContext.clearErrors,
      control = _useFormContext.control,
      setValue = _useFormContext.setValue,
      trigger = _useFormContext.trigger; // *define Fields-value Array depend on special fields' value


  var dependOnFieldsArray = React.useMemo(function () {
    return dependOnFields ? dependOnFields.map(function (f) {
      return watch()[f];
    }) : undefined;
  }, [watch()]); // *compatible disabled data-type

  var DisabledMemo = React.useMemo(function () {
    return disabled instanceof Function ? disabled(watch()) : disabled;
  }, [dependOnFieldsArray]);
  React.useEffect(function () {
    if (DisabledMemo) clearErrors(name);
    return function () {};
  }, [DisabledMemo]); // *compatible register config

  var RegisterConfigMemo = React.useMemo(function () {
    return Object.assign({}, registerConfig instanceof Function ? registerConfig(watch()) : registerConfig);
  }, [registerConfig, watch()]); // *set Label

  var required = (_b = RegisterConfigMemo.validate) === null || _b === void 0 ? void 0 : _b.empty;
  var labelNode = React.useMemo(function () {
    return tips ? /*#__PURE__*/React__default['default'].createElement(TipLabel, {
      required: Boolean(required),
      label: label,
      tips: tips
    }) : (required ? '* ' : '') + label;
  }, [required]); // *register config

  var rules = React.useMemo(function () {
    return DisabledMemo ? {} : RegisterConfigMemo;
  }, [DisabledMemo, RegisterConfigMemo]);
  return /*#__PURE__*/React__default['default'].createElement(reactHookForm.Controller, {
    control: control,
    name: name,
    rules: rules,
    defaultValue: defaultValue !== null && defaultValue !== void 0 ? defaultValue : '',
    render: function render(props) {
      return /*#__PURE__*/React__default['default'].createElement(core.TextField, {
        label: labelNode,
        value: props.value,
        disabled: DisabledMemo,
        placeholder: placeholder,
        type: "datetime-local",
        autoFocus: autoFocus,
        error: Boolean(errors[name]),
        helperText: /*#__PURE__*/React__default['default'].createElement("span", {
          style: {
            position: 'absolute'
          }
        }, errors[name] ? errors[name].message : ''),
        InputLabelProps: {
          shrink: true
        },
        variant: "outlined",
        onChange: function onChange(e) {
          console.log(e.target.value);
          setValue(name, moment__default['default'].utc(e.target.value).format('YYYY-MM-DDTHH:mm'));

          if (affectFields && affectFields instanceof Array) {
            affectFields.forEach(function (f) {
              setValue(f, null);
            });
          }

          trigger(name);
        }
      });
    }
  });
} // todo use @material-picker-beta
// or https://rsuitejs.com/components/date-range-picker/

function FormResetBtn(_ref) {
  var optionFn = _ref.optionFn;

  var _useFormContext = useFormContext(),
      reset = _useFormContext.reset,
      defaultValues = _useFormContext.defaultValues;

  return /*#__PURE__*/React__default['default'].createElement(core.Button, {
    key: "reset",
    onClick: function onClick() {
      reset(defaultValues);
      optionFn && optionFn();
    }
  }, "Cancel");
}

exports.FieldAutoInput = FieldAutoInput;
exports.FieldDatePicker = FiledDatePicker;
exports.FieldDateRangePicker = FieldDateRangePicker;
exports.FieldDateTimePicker = FieldDateTimePicker;
exports.FieldMultiCascaderSelect = FieldMultiCascaderSelect;
exports.FieldRadio = FieldRadio;
exports.FieldSelect = QueryFieldSelect;
exports.FieldText = LiteFieldText;
exports.Form = Form;
exports.FormResetBtn = FormResetBtn;
//# sourceMappingURL=bundle.js.map
