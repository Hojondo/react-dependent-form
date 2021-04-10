'use strict';



function __$styleInject(css) {
    if (!css) return;

    if (typeof window == 'undefined') return;
    var style = document.createElement('style');
    style.setAttribute('media', 'screen');

    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

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

const formContext = /*#__PURE__*/React.createContext({});
const FormProvider = formContext.Provider;
const useFormContext = () => React.useContext(formContext);

function Form(_a) {
  var {
    onSubmit,
    children,
    defaultValues = {}
  } = _a,
      otherProps = __rest(_a, ["onSubmit", "children", "defaultValues"]);

  const {
    unregister,
    register,
    handleSubmit,
    watch,
    errors,
    reset,
    trigger,
    setValue,
    getValues,
    control,
    setError,
    clearErrors
  } = reactHookForm.useForm({
    mode: 'onSubmit',
    defaultValues
  });

  const HOC_submit = Fn => () => {
    Fn(watch());
  }; // !mark: change the fieldsVal to be watch(), tend to get real vals


  console.log(watch());
  return /*#__PURE__*/React__default['default'].createElement(FormProvider //@ts-ignore[1]
  , {
    //@ts-ignore[1]
    value: {
      unregister,
      register,
      errors,
      setValue,
      getValues,
      trigger,
      control,
      watch,
      reset,
      setError,
      clearErrors,
      defaultValues
    }
  }, /*#__PURE__*/React__default['default'].createElement("form", Object.assign({
    onSubmit: handleSubmit(HOC_submit(onSubmit))
  }, otherProps), children));
} // todo 封装渲染render方法
// todo 统一起来所有的dependonField 和 affectField 关联关系，在form中，可以尝试useEffect

function TipLabel({
  required,
  label,
  tips
}) {
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

const StyledTexfield = styles.withStyles({
  root: {
    "& .MuiInputLabel-root": {
      pointerEvents: "unset"
    }
  }
})(core.TextField);
function LiteFieldText(_a) {
  var {
    name,
    multiline = false,
    rowsMax = 4,
    label,
    defaultValue,
    disabled = false,
    autoFocus = false,
    placeholder = "Input",
    registerConfig = {
      required: false
    },
    tips = "",
    affectFields,
    dependOnFields
  } = _a,
      otherProps = __rest(_a, ["name", "multiline", "rowsMax", "label", "defaultValue", "disabled", "autoFocus", "placeholder", "registerConfig", "tips", "affectFields", "dependOnFields"]);

  function isKeyofInputElement(prop) {
    return prop in HTMLInputElement.prototype;
  }

  const {
    watch,
    errors,
    setValue,
    trigger,
    control,
    clearErrors
  } = useFormContext(); // *compatible register config

  const RegisterConfigMemo = React.useMemo(() => registerConfig instanceof Function ? registerConfig(watch()) : registerConfig, [registerConfig, watch()]);
  const {
    required
  } = RegisterConfigMemo; // *force to change require message to 'Input cannot be empty!'

  if (required === true) registerConfig = Object.assign(Object.assign({}, registerConfig), {
    required: "Input cannot be empty!"
  }); // *set Label

  let labelNode = (required ? "* " : "") + label;
  if (tips) labelNode = /*#__PURE__*/React__default['default'].createElement(TipLabel, {
    required: Boolean(required),
    label: label,
    tips: tips
  }); // *compatible disabled data-type

  const DisabledMemo = React.useMemo(() => disabled instanceof Function ? disabled(watch()) : disabled, [watch()]);
  React.useEffect(() => {
    if (DisabledMemo) clearErrors(name);
    return () => {};
  }, [DisabledMemo]);
  const rules = React.useMemo(() => DisabledMemo ? {} : registerConfig, [DisabledMemo, registerConfig]);
  return /*#__PURE__*/React__default['default'].createElement(reactHookForm.Controller, {
    name: name,
    control: control,
    rules: rules,
    defaultValue: defaultValue ? defaultValue : "",
    render: props => /*#__PURE__*/React__default['default'].createElement(StyledTexfield, {
      value: props.value,
      multiline: multiline,
      rowsMax: rowsMax,
      fullWidth: true,
      disabled: DisabledMemo,
      label: labelNode,
      placeholder: placeholder,
      autoFocus: autoFocus,
      onChange: v => {
        setValue(name, v.target.value);

        if (affectFields && affectFields instanceof Array) {
          affectFields.forEach(f => {
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
      inputProps: Object.keys(otherProps).reduce((r, c) => isKeyofInputElement(c) ? Object.assign(Object.assign({}, r), {
        [c]: otherProps[c]
      }) : r, {}),
      InputProps: {
        startAdornment: /*#__PURE__*/React__default['default'].createElement("span", null)
      }
    })
  });
}

const CreateCompatibleValueFC$1 = optionsObj => val => {
  var _a;

  return typeof val === 'string' || typeof val === 'boolean' ? val : val && ((_a = optionsObj.find(o => o.value === val.value)) === null || _a === void 0 ? void 0 : _a.value);
};

function QueryFieldSelect(_a) {
  var _b;

  var {
    name,
    label,
    placeholder = 'Select',
    tips,
    optionsData = [],
    defaultValue,
    disabled,
    autoFocus = false,
    registerConfig,
    affectFields,
    dependOnFields
  } = _a,
      otherProps = __rest(_a, ["name", "label", "placeholder", "tips", "optionsData", "defaultValue", "disabled", "autoFocus", "registerConfig", "affectFields", "dependOnFields"]);

  function isKeyofInputElement(prop) {
    return prop in HTMLSelectElement.prototype;
  }

  const {
    errors,
    trigger,
    setValue,
    control,
    watch,
    clearErrors
  } = useFormContext(); // *get options data depend on special fields' value

  const dependOnFieldsArray = React.useMemo(() => dependOnFields ? dependOnFields.map(f => watch()[f]) : null, [watch()]); // todo fix the warning in devtool when get async option after component-rendered

  const [optionsDataState, setOptionsDataState] = React.useState([]);
  const compatibleValueFn = React.useCallback(CreateCompatibleValueFC$1(optionsDataState), [optionsDataState]);
  React.useEffect(() => {
    // !mark: use Promise to compatible whatever the (return of)optionData of parmas is an array or promise
    Promise.resolve(optionsData instanceof Function ? optionsData(watch()) : optionsData).then(res => {
      setOptionsDataState(res);
    });
    return () => {};
  }, [dependOnFieldsArray, optionsData, watch()]); // *compatible register config

  const RegisterConfigMemo = React.useMemo(() => {
    let configTemp = Object.assign({}, registerConfig instanceof Function ? registerConfig(watch()) : registerConfig);

    if (configTemp.required) {
      configTemp.required = false; // !mark: cause react-hook-form can't support value (boolean-false) validation, need to suppress native mandatory

      configTemp.validate = Object.assign(Object.assign({}, configTemp.validate), {
        empty: data => ___default['default'].some(optionsDataState, o => ___default['default'].isEqual(compatibleValueFn(data), o.value)) || 'Select cannot be empty!'
      });
    }

    return configTemp;
  }, [registerConfig, watch(), optionsDataState]); // *set Label

  const required = (_b = RegisterConfigMemo.validate) === null || _b === void 0 ? void 0 : _b.empty;
  const labelNode = React.useMemo(() => tips ? /*#__PURE__*/React__default['default'].createElement(TipLabel, {
    required: Boolean(required),
    label: label,
    tips: tips
  }) : (required ? '* ' : '') + label, [required]); // *compatible disabled data-type

  const DisabledMemo = React.useMemo(() => disabled instanceof Function ? disabled(watch()) : disabled, [dependOnFieldsArray]);
  React.useEffect(() => {
    if (DisabledMemo) clearErrors(name);
    return () => {};
  }, [DisabledMemo]); // *register config

  const rules = React.useMemo(() => DisabledMemo ? {} : RegisterConfigMemo, [DisabledMemo, RegisterConfigMemo]);
  return /*#__PURE__*/React__default['default'].createElement(reactHookForm.Controller, {
    defaultValue: defaultValue !== null && defaultValue !== void 0 ? defaultValue : '',
    control: control,
    name: name,
    rules: rules,
    render: props => {
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
        onChange: e => {
          setValue(name, e.target.value);

          if (affectFields && affectFields instanceof Array) {
            affectFields.forEach(f => {
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
          renderValue: value => {
            var _a;

            if (optionsDataState.map(o => o.value).includes(value)) return (_a = optionsDataState.find(o => o.value === value)) === null || _a === void 0 ? void 0 : _a.label;else return /*#__PURE__*/React__default['default'].createElement("span", {
              style: {
                color: 'rgba(0, 0, 0, 0.42)'
              }
            }, placeholder); //!mark: aim to show a placeholder like text-input
          }
        },
        inputProps: Object.keys(otherProps).reduce((r, c) => isKeyofInputElement(c) ? Object.assign(Object.assign({}, r), {
          [c]: otherProps[c]
        }) : r, {})
      }, ___default['default'].sortBy(optionsDataState, o => o.label).map(o => /*#__PURE__*/React__default['default'].createElement(core.MenuItem, {
        key: String(o.value),
        // @ts-ignore [1]
        value: o.value,
        disabled: o.disabled
      }, o.label)));
    }
  });
}

const StyledTextField = styles.withStyles({
  root: {
    "& .MuiInputLabel-outlined": {
      pointerEvents: "unset"
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

  var {
    name,
    label,
    multiple = false,
    optionsData,
    defaultValue,
    disabled,
    placeholder = "Input",
    tips,
    registerConfig = {
      required: false
    },
    affectFields,
    dependOnFields
  } = _a;
      __rest(_a, ["name", "label", "multiple", "optionsData", "defaultValue", "disabled", "placeholder", "tips", "registerConfig", "affectFields", "dependOnFields"]);

  const {
    watch,
    errors,
    setValue,
    trigger,
    control,
    clearErrors
  } = useFormContext(); // *get options data depend on special fields' value

  const dependOnFieldsArray = React.useMemo(() => dependOnFields ? dependOnFields.map(f => watch()[f]) : null, [watch()]);
  const [optionsDataState, setOptionsDataState] = React.useState([]); // const compatibleValueFn = useCallback(
  //   CreateCompatibleValueFC(optionsDataState),
  //   [optionsDataState],
  // );

  React.useEffect(() => {
    // !mark: use Promise to compatible whatever the (return of)optionData of parmas is an array or promise
    Promise.resolve(optionsData instanceof Function ? optionsData(watch()) : optionsData).then(res => {
      setOptionsDataState(res);
    });
    return () => {};
  }, [dependOnFieldsArray]); // *compatible register config

  const RegisterConfigMemo = React.useMemo(() => {
    let configTemp = Object.assign({}, registerConfig instanceof Function ? registerConfig(watch()) : registerConfig);

    if (configTemp.required) {
      configTemp.required = false; // !mark: cause react-hook-form can't support value (boolean-false) validation, need to suppress native mandatory

      configTemp.validate = Object.assign(Object.assign({}, configTemp.validate), {
        empty: data => ___default['default'].some(optionsDataState, o => ___default['default'].isEqual(data, o.value)) || "Input cannot be empty!"
      });
    }

    return configTemp;
  }, [registerConfig, watch(), optionsDataState]); // *set Label

  const required = (_b = RegisterConfigMemo.validate) === null || _b === void 0 ? void 0 : _b.empty;
  const labelNode = React.useMemo(() => tips ? /*#__PURE__*/React__default['default'].createElement(TipLabel, {
    required: Boolean(required),
    label: label,
    tips: tips
  }) : (required ? "* " : "") + label, [required]); // *compatible disabled data-type

  const DisabledMemo = React.useMemo(() => disabled instanceof Function ? disabled(watch()) : disabled, [dependOnFieldsArray]);
  React.useEffect(() => {
    if (DisabledMemo) clearErrors(name);
    return () => {};
  }, [DisabledMemo]); // *register config

  const rules = React.useMemo(() => DisabledMemo ? {} : RegisterConfigMemo, [DisabledMemo, RegisterConfigMemo]);
  return /*#__PURE__*/React__default['default'].createElement(reactHookForm.Controller, {
    name: name,
    control: control,
    rules: rules,
    defaultValue: defaultValue !== null && defaultValue !== void 0 ? defaultValue : multiple ? [] : null,
    render: props => {
      return /*#__PURE__*/React__default['default'].createElement(lab.Autocomplete, {
        multiple: multiple,
        value: props.value,
        disabled: DisabledMemo,
        options: ___default['default'].sortBy(optionsDataState, o => o.label).map(o => o.value),
        filterSelectedOptions: true,
        onChange: (e, v, reason) => {
          console.log(v, reason);
          setValue(name, v);

          if (affectFields && affectFields instanceof Array) {
            affectFields.forEach(f => {
              setValue(f, null);
            });
          }

          trigger(name);
          dependOnFields && clearErrors(dependOnFields); // *in case for situation like two fields can't be same
        },
        onInputChange: (e, v) => {
          setValue(name, v);
        },
        renderInput: params => {
          return /*#__PURE__*/React__default['default'].createElement(StyledTextField, Object.assign({}, params, {
            variant: "outlined",
            label: labelNode,
            placeholder: placeholder,
            error: Boolean(errors[name]),
            helperText: /*#__PURE__*/React__default['default'].createElement("span", {
              style: {
                position: "absolute"
              }
            }, errors[name] ? errors[name].message : ""),
            InputProps: Object.assign(Object.assign({}, params.InputProps), {
              startAdornment: /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("span", null), params.InputProps.startAdornment)
            })
          }));
        },
        getOptionLabel: x => {
          var _a, _b; // todo
          // !mark: there is a bug in Material-UI@v4 https://github.com/mui-org/material-ui/issues/19173#issuecomment-786109015;
          // !mark: so if the async options later than component-mounted, just to use the value-string


          return (_b = (_a = optionsDataState.find(o => o.value === x)) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : String(x);
        },
        getOptionSelected: (option, value) => {
          return ___default['default'].isEqual(value, option);
        }
      });
    }
  });
} // todo rename affectFields to clearFieldsOnChange
// todo add freeSolo

const CreateCompatibleValueFC = optionsObj => val => {
  var _a;

  return typeof val === 'string' || typeof val === 'boolean' ? val : val && ((_a = optionsObj.find(o => o.value === val.value)) === null || _a === void 0 ? void 0 : _a.value);
};

function FieldRadio(_a) {
  var _b;

  var {
    name,
    label,
    optionsData = [],
    defaultValue,
    tips,
    disabled = false,
    autoFocus = false,
    registerConfig,
    affectFields,
    dependOnFields
  } = _a,
      otherProps = __rest(_a, ["name", "label", "optionsData", "defaultValue", "tips", "disabled", "autoFocus", "registerConfig", "affectFields", "dependOnFields"]);

  function isKeyofInputElement(prop) {
    return prop in HTMLInputElement.prototype;
  }

  const {
    watch,
    errors,
    trigger,
    setValue,
    control,
    clearErrors
  } = useFormContext(); // *get options data depend on special fields' value

  const dependOnFieldsArray = React.useMemo(() => dependOnFields ? dependOnFields.map(f => watch()[f]) : null, [watch()]);
  const [optionsDataState, setOptionsDataState] = React.useState([]);
  const compatibleValueFn = React.useCallback(CreateCompatibleValueFC(optionsDataState), [optionsDataState]);
  React.useEffect(() => {
    // !mark: use Promise to compatible whatever the (return of)optionData of parmas is an array or promise
    Promise.resolve(optionsData instanceof Function ? optionsData(watch()) : optionsData).then(res => {
      setOptionsDataState(res);
    });
    return () => {};
  }, [dependOnFieldsArray]); // *compatible register config

  const RegisterConfigMemo = React.useMemo(() => {
    let configTemp = Object.assign({}, registerConfig instanceof Function ? registerConfig(watch()) : registerConfig);

    if (configTemp.required) {
      configTemp.required = false; // !mark: cause react-hook-form can't support value (boolean-false) validation, need to suppress native mandatory

      configTemp.validate = Object.assign(Object.assign({}, configTemp.validate), {
        empty: data => ___default['default'].some(optionsDataState, o => ___default['default'].isEqual(compatibleValueFn(data), o.value)) || 'Radio cannot be empty!'
      });
    }

    return configTemp;
  }, [registerConfig, watch(), optionsDataState]); // *set Label

  const required = (_b = RegisterConfigMemo.validate) === null || _b === void 0 ? void 0 : _b.empty;
  const labelNode = React.useMemo(() => tips ? /*#__PURE__*/React__default['default'].createElement(TipLabel, {
    required: Boolean(required),
    label: label,
    tips: tips
  }) : (required ? '* ' : '') + label, [required]); // *compatible disabled data-type

  const DisabledMemo = React.useMemo(() => disabled instanceof Function ? disabled(watch()) : disabled, [dependOnFieldsArray]);
  React.useEffect(() => {
    if (DisabledMemo) clearErrors(name);
    return () => {};
  }, [DisabledMemo]); // *register config

  const rules = React.useMemo(() => DisabledMemo ? {} : RegisterConfigMemo, [DisabledMemo, RegisterConfigMemo]);
  return /*#__PURE__*/React__default['default'].createElement(reactHookForm.Controller, {
    name: name,
    defaultValue: defaultValue !== null && defaultValue !== void 0 ? defaultValue : '',
    control: control,
    rules: rules,
    render: props => {
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
      }, optionsDataState.map(o => {
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
            onClick: () => {
              if (___default['default'].isEqual(compatibleValueFn(props.value), o.value)) setValue(name, '');else setValue(name, o.value);

              if (affectFields && affectFields instanceof Array) {
                affectFields.forEach(f => {
                  setValue(f, null);
                });
              }

              trigger(name);
            },
            inputProps: Object.keys(otherProps).reduce((r, c) => isKeyofInputElement(c) ? Object.assign(Object.assign({}, r), {
              [c]: otherProps[c]
            }) : r, {})
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

var StyledFormLabel = core.withStyles(theme => ({
  root: {
    fontSize: '0.75rem',
    // zIndex: 6,
    // pointerEvents: 'none',
    // background: '#FFF',
    padding: "0 5px",
    width: "auto",
    textAlign: "left"
  }
}))(core.FormLabel);

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

__$styleInject(".DateRangePickerInput {\n  border-radius: inherit;\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  min-height: 56px;\n  background-color: transparent!important;\n}\n.DateInput {\n  background-color: transparent;\n}\n.DateInput_input {\n  box-sizing: border-box;\n  background-color: transparent;\n}\n");

function ReactDateRangePicker({
  timeRangeObj,
  name,
  affectFields
}) {
  var _a, _b;

  const {
    setValue,
    trigger
  } = React.useContext(formContext);
  const [focusedInput, setFocusedInput] = React.useState(null);

  const uploadNewDate = ({
    startDate,
    endDate
  }) => {
    setValue(name, {
      startDate: startDate ? moment__namespace.utc(startDate.format("YYYY-MM-DD")) : startDate,
      endDate: endDate ? moment__namespace.utc(endDate.format("YYYY-MM-DD")).set({
        hour: 23,
        minute: 59,
        second: 59
      }) : endDate
    });

    if (affectFields && affectFields instanceof Array) {
      affectFields.forEach(f => {
        setValue(f, null);
      });
    }

    trigger(name);
  };

  return /*#__PURE__*/React__default['default'].createElement(reactDates.DateRangePicker, {
    block: true,
    // appendToBody
    // showClearDates
    // reopenPickerOnClearDates
    hideKeyboardShortcutsPanel: true,
    noBorder: true,
    numberOfMonths: 2,
    startDate: (_a = timeRangeObj.startDate) !== null && _a !== void 0 ? _a : null,
    startDateId: `${name}_start_date_id`,
    endDate: (_b = timeRangeObj.endDate) !== null && _b !== void 0 ? _b : null,
    endDateId: `${name}_end_date_id`,
    onDatesChange: uploadNewDate,
    focusedInput: focusedInput,
    onFocusChange: focusedInput => setFocusedInput(focusedInput),
    isOutsideRange: () => false,
    minimumNights: 0
  });
}

function FieldDateRangePicker(_a) {
  var _b;

  var {
    name,
    disabled,
    label,
    defaultValue,
    registerConfig,
    tips,
    affectFields,
    dependOnFields
  } = _a;
      __rest(_a, ["name", "disabled", "label", "defaultValue", "registerConfig", "tips", "affectFields", "dependOnFields"]);

  const {
    watch,
    errors,
    clearErrors,
    setValue,
    trigger,
    control
  } = React.useContext(formContext); // *define Fields-value Array depend on special fields' value

  const dependOnFieldsArray = React.useMemo(() => dependOnFields ? dependOnFields.map(f => watch()[f]) : undefined, [watch()]); // *compatible disabled data-type

  const DisabledMemo = React.useMemo(() => disabled instanceof Function ? disabled(watch()) : disabled, [dependOnFieldsArray]);
  React.useEffect(() => {
    if (DisabledMemo) clearErrors(name);
    return () => {};
  }, [DisabledMemo]); // *compatible register config

  const RegisterConfigMemo = React.useMemo(() => Object.assign({}, registerConfig instanceof Function ? registerConfig(watch()) : registerConfig), [registerConfig, watch()]); // *set Label

  const required = (_b = RegisterConfigMemo.validate) === null || _b === void 0 ? void 0 : _b.empty;
  const labelNode = React.useMemo(() => tips ? /*#__PURE__*/React__default['default'].createElement(TipLabel, {
    required: Boolean(required),
    label: label,
    tips: tips
  }) : (required ? "* " : "") + label, [required]); // *register config

  const rules = React.useMemo(() => DisabledMemo ? {} : RegisterConfigMemo, [DisabledMemo, RegisterConfigMemo]);
  return /*#__PURE__*/React__default['default'].createElement(reactHookForm.Controller, {
    control: control,
    name: name,
    defaultValue: defaultValue !== null && defaultValue !== void 0 ? defaultValue : {},
    rules: rules,
    render: props => /*#__PURE__*/React__default['default'].createElement(core.FormControl, {
      component: "fieldset",
      error: Boolean(errors[name]),
      fullWidth: true,
      disabled: DisabledMemo,
      style: {
        border: "1px solid rgba(0, 0, 0, 0.23)",
        boxSizing: "border-box",
        borderRadius: "4px",
        padding: "0 8px"
      }
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
    }, errors[name] ? errors[name].message : "")))
  });
} // todo use @material-picker-beta
// or https://rsuitejs.com/components/date-range-picker/

function FiledDatePicker(_a) {
  var _b;

  var {
    name,
    disabled,
    label,
    placeholder = 'Search',
    defaultValue,
    registerConfig,
    tips,
    affectFields,
    dependOnFields
  } = _a;
      __rest(_a, ["name", "disabled", "label", "placeholder", "defaultValue", "registerConfig", "tips", "affectFields", "dependOnFields"]);

  const {
    watch,
    errors,
    clearErrors,
    setValue,
    trigger,
    control
  } = useFormContext(); // *define Fields-value Array depend on special fields' value

  const dependOnFieldsArray = React.useMemo(() => dependOnFields ? dependOnFields.map(f => watch()[f]) : undefined, [watch()]);

  const uploadNewDate = date => {
    setValue(name, date);
    trigger(name);
  }; // *compatible disabled data-type


  const DisabledMemo = React.useMemo(() => disabled instanceof Function ? disabled(watch()) : disabled, [dependOnFieldsArray]);
  React.useEffect(() => {
    if (DisabledMemo) clearErrors(name);
    return () => {};
  }, [DisabledMemo]); // *compatible register config

  const RegisterConfigMemo = React.useMemo(() => Object.assign({}, registerConfig instanceof Function ? registerConfig(watch()) : registerConfig), [registerConfig, watch()]); // *set Label

  const required = (_b = RegisterConfigMemo.validate) === null || _b === void 0 ? void 0 : _b.empty;
  const labelNode = React.useMemo(() => tips ? /*#__PURE__*/React__default['default'].createElement(TipLabel, {
    required: Boolean(required),
    label: label,
    tips: tips
  }) : (required ? '* ' : '') + label, [required]); // *register config

  const rules = React.useMemo(() => DisabledMemo ? {} : RegisterConfigMemo, [DisabledMemo, RegisterConfigMemo]);
  return /*#__PURE__*/React__default['default'].createElement(reactHookForm.Controller, {
    control: control,
    name: name,
    rules: rules,
    defaultValue: defaultValue !== null && defaultValue !== void 0 ? defaultValue : '',
    render: props => {
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
        onChange: e => {
          uploadNewDate(e.target.value);

          if (affectFields && affectFields instanceof Array) {
            affectFields.forEach(f => {
              setValue(f, null);
            });
          }
        },
        InputProps: {
          endAdornment: /*#__PURE__*/React__default['default'].createElement(core.IconButton, {
            onClick: e => {
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

__$styleInject(".so-cascader-overrides {\n  cursor: pointer;\n  min-height: 56px;\n  line-height: 1.1876em;\n  font-size: 1rem;\n  border: 1px solid rgba(0, 0, 0, 0.87) !important;\n  transition: unset;\n}\n.so-cascader-overrides:hover,\n.so-cascader-overrides:focus {\n  border-color: rgba(0, 0, 0, 0.87) !important;\n  box-shadow: unset !important;\n}\n.so-cascader-overrides.so-input-focus {\n  border: 1px solid #1976d2 !important;\n  box-shadow: unset !important;\n}\n.so-cascader-overrides.so-input-focus::before {\n  content: '';\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  border: 1px solid #1976d2;\n  border-radius: var(--input-border-radius, 3px);\n  z-index: 1;\n  pointer-events: none;\n}\n.so-cascader-overrides .so-cascader-result {\n  padding: 9px;\n}\n.so-cascader-overrides .so-cascader-result .so-cascader-item {\n  background: transparent;\n  max-width: unset;\n  padding: 2px 3px;\n  margin: 0;\n}\n.so-cascader-overrides .so-cascader-result span {\n  display: unset;\n  overflow: unset;\n  max-width: unset;\n  padding: 0 12px;\n  margin-right: unset;\n  margin-bottom: unset;\n  border-radius: unset;\n  color: unset;\n  text-overflow: unset;\n}\n.so-cascader-overrides .so-cascader-result .so-input-placeholder {\n  font-size: 1rem;\n  height: 100%;\n  display: flex;\n  position: absolute;\n  top: 0;\n  left: 0;\n  align-items: center;\n  color: rgba(0, 0, 0, 0.42);\n}\n.so-list-absolute-wrapper {\n  z-index: 1301;\n}\n");

function FieldMultiCascaderSelect(_a) {
  var _b;

  var {
    name,
    label,
    tips,
    placeholder = 'Select',
    disabled,
    optionsData,
    defaultValue,
    registerConfig,
    affectFields,
    dependOnFields
  } = _a;
      __rest(_a, ["name", "label", "tips", "placeholder", "disabled", "optionsData", "defaultValue", "registerConfig", "affectFields", "dependOnFields"]);

  const {
    watch,
    errors,
    clearErrors,
    setValue,
    trigger,
    control
  } = useFormContext(); // *get options data depend on special fields' value

  const dependOnFieldsArray = React.useMemo(() => dependOnFields ? dependOnFields.map(f => watch()[f]) : null, [watch()]); // todo fix the warning in devtool when get async option after component-rendered

  const [optionsDataState, setOptionsDataState] = React.useState([]);
  React.useEffect(() => {
    // !mark: use Promise to compatible whatever the (return of)optionData of parmas is an array or promise
    Promise.resolve(optionsData instanceof Function ? optionsData(watch()) : optionsData).then(res => {
      setOptionsDataState(res);
    });
    return () => {};
  }, [dependOnFieldsArray, optionsData, watch()]); // todo replace watch() with more accurate array list
  // *compatible register config

  const RegisterConfigMemo = React.useMemo(() => {
    let configTemp = Object.assign({}, registerConfig instanceof Function ? registerConfig(watch()) : registerConfig);
    return configTemp;
  }, [registerConfig, watch(), optionsDataState]); // *set Label

  const required = (_b = RegisterConfigMemo.validate) === null || _b === void 0 ? void 0 : _b.empty;
  const labelNode = React.useMemo(() => tips ? /*#__PURE__*/React__default['default'].createElement(TipLabel, {
    required: Boolean(required),
    label: label,
    tips: tips
  }) : (required ? '* ' : '') + label, [required]); // *compatible disabled data-type

  const DisabledMemo = React.useMemo(() => disabled instanceof Function ? disabled(watch()) : disabled, [dependOnFieldsArray]);
  React.useEffect(() => {
    if (DisabledMemo) clearErrors(name);
    return () => {};
  }, [DisabledMemo]); // *register config

  const rules = React.useMemo(() => DisabledMemo ? {} : RegisterConfigMemo, [DisabledMemo, RegisterConfigMemo]);

  const flattenNestArray = nestedArray => nestedArray.reduce((r, c) => {
    var _a;

    return [...r, c, ...((_a = c.children) !== null && _a !== void 0 ? _a : [])];
  }, []); // 2 level-mode nested array


  const uploadNewData = (valueArray, selected) => {
    setValue(name, flattenNestArray(optionsDataState).filter(i => valueArray.includes(i.value)).map(i => i.value));

    if (affectFields && affectFields instanceof Array) {
      affectFields.forEach(f => {
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
    render: props => {
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
        renderItem: ({
          label
        }) => label,
        renderResult: ({
          label
        }) => {
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

  var {
    name,
    disabled,
    autoFocus = false,
    label,
    defaultValue,
    placeholder = 'Search',
    registerConfig,
    tips,
    affectFields,
    dependOnFields
  } = _a;
      __rest(_a, ["name", "disabled", "autoFocus", "label", "defaultValue", "placeholder", "registerConfig", "tips", "affectFields", "dependOnFields"]) // like step ...etc
  ;

  const {
    watch,
    errors,
    clearErrors,
    control,
    setValue,
    trigger
  } = useFormContext(); // *define Fields-value Array depend on special fields' value

  const dependOnFieldsArray = React.useMemo(() => dependOnFields ? dependOnFields.map(f => watch()[f]) : undefined, [watch()]); // *compatible disabled data-type

  const DisabledMemo = React.useMemo(() => disabled instanceof Function ? disabled(watch()) : disabled, [dependOnFieldsArray]);
  React.useEffect(() => {
    if (DisabledMemo) clearErrors(name);
    return () => {};
  }, [DisabledMemo]); // *compatible register config

  const RegisterConfigMemo = React.useMemo(() => Object.assign({}, registerConfig instanceof Function ? registerConfig(watch()) : registerConfig), [registerConfig, watch()]); // *set Label

  const required = (_b = RegisterConfigMemo.validate) === null || _b === void 0 ? void 0 : _b.empty;
  const labelNode = React.useMemo(() => tips ? /*#__PURE__*/React__default['default'].createElement(TipLabel, {
    required: Boolean(required),
    label: label,
    tips: tips
  }) : (required ? '* ' : '') + label, [required]); // *register config

  const rules = React.useMemo(() => DisabledMemo ? {} : RegisterConfigMemo, [DisabledMemo, RegisterConfigMemo]);
  return /*#__PURE__*/React__default['default'].createElement(reactHookForm.Controller, {
    control: control,
    name: name,
    rules: rules,
    defaultValue: defaultValue !== null && defaultValue !== void 0 ? defaultValue : '',
    render: props => /*#__PURE__*/React__default['default'].createElement(core.TextField, {
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
      onChange: e => {
        console.log(e.target.value);
        setValue(name, moment__default['default'].utc(e.target.value).format('YYYY-MM-DDTHH:mm'));

        if (affectFields && affectFields instanceof Array) {
          affectFields.forEach(f => {
            setValue(f, null);
          });
        }

        trigger(name);
      }
    })
  });
} // todo use @material-picker-beta
// or https://rsuitejs.com/components/date-range-picker/

function FormResetBtn({
  optionFn
}) {
  const {
    reset,
    defaultValues
  } = useFormContext();
  return /*#__PURE__*/React__default['default'].createElement(core.Button, {
    key: "reset",
    onClick: () => {
      reset(defaultValues);
      optionFn && optionFn();
    }
  }, "Cancel");
}

const a = 'ss';

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
exports.a = a;
//# sourceMappingURL=bundle.js.map
