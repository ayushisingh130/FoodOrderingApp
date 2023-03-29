import classes from "./Checkout.module.css";
import useInput from "../hooks/use-Input";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length !== 6;

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    valueBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput(isEmpty);

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetInputChangeHandler,
    valueBlurHandler: streetInputBlurHandler,
    reset: resetStreetInput,
  } = useInput(isEmpty);

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeInputChangeHandler,
    valueBlurHandler: postalCodeInputBlurHandler,
    reset: resetPostalCodeInput,
  } = useInput(isFiveChars);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityInputChangeHandler,
    valueBlurHandler: cityInputBlurHandler,
    reset: resetCityInput,
  } = useInput(isEmpty);

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPostalCodeIsValid &&
    enteredCityIsValid
  ) {
    formIsValid = true;
    props.setdataIsValid(true);
  }

  const invalidFormText = (
    <p style={{ color: "red" }}>Incomplete Address! Please fill the form. </p>
  );

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      console.log("form is not valid");
    }

    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      street: enteredStreet,
      postalCode: enteredPostalCode,
    });

    resetNameInput();
    resetStreetInput();
    resetPostalCodeInput();
    resetCityInput();
  };

  const nameControlClasses = `${classes.control} ${
    nameInputHasError ? classes.invalid : ""
  }`;
  const streetControlClasses = `${classes.control} ${
    streetInputHasError ? classes.invalid : ""
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    postalCodeInputHasError ? classes.invalid : ""
  }`;
  const cityControlClasses = `${classes.control} ${
    cityInputHasError ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputHasError && <p>Please enter a valid name!</p>}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor="city">Your city</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
        />
        {cityInputHasError && <p>Please enter a valid city name!</p>}
      </div>

      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
        />
        {streetInputHasError && <p>Please enter a valid Street Name!</p>}
      </div>

      <div className={postalCodeControlClasses}>
        <label htmlFor="PostalCode">PostalCode</label>
        <input
          type="text"
          id="PostalCode"
          value={enteredPostalCode}
          onChange={postalCodeInputChangeHandler}
          onBlur={postalCodeInputBlurHandler}
        />
        {postalCodeInputHasError && (
          <p>
            Please enter a valid PostalCode(postalcode must be 6 characters
            long)!
          </p>
        )}
        {!props.dataIsValid && invalidFormText}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
