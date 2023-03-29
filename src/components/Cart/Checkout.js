import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formsInputValidity, setformsInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputref = useRef();
  const streetInputref = useRef();
  const postCodeInputref = useRef();
  const cityInputref = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputref.current.value;
    const enteredStreet = streetInputref.current.value;
    const enteredPostalCode = postCodeInputref.current.value;
    const enteredCity = cityInputref.current.value;

    const eneteredNameisValid = !isEmpty(enteredName);
    const enteredStreetisValid = !isEmpty(enteredStreet);
    const enteredCityisValid = !isEmpty(enteredCity);
    const enteredPostalCodeisValid = isFiveChars(enteredPostalCode);

    setformsInputValidity({
      name: eneteredNameisValid,
      street: enteredStreetisValid,
      city: enteredCityisValid,
      postCode: enteredPostalCodeisValid,
    });

    const formIsValid =
      eneteredNameisValid &&
      enteredCityisValid &&
      enteredStreetisValid &&
      enteredPostalCodeisValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      street: enteredStreet,
      postalCode: enteredPostalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formsInputValidity.name ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formsInputValidity.street ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formsInputValidity.city ? "" : classes.invalid
  }`;

  const postalCodeControlClasses = `${classes.control} ${
    formsInputValidity.postalCode ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputref} />
        {!formsInputValidity.name && <p> Please enter a valid name! </p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputref} />
        {!formsInputValidity.street && <p> Please enter a valid street! </p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postCodeInputref} />
        {!formsInputValidity.postalCode && (
          <p>
            {" "}
            Please enter a valid PostalCode(Code must be 6 characters long)!{" "}
          </p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputref} />
        {!formsInputValidity.city && <p> Please enter a valid city name! </p>}
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
