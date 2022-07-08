export const checkoutShippingValidator = (field = "", type = "", shippingDetails, billingDetails) => {
  let isValid = true;
  let shippingErrText = '';
  let billingErrText = '';

  if (field !== "") {
    if (field !== "shippingMode" && field !== "isSameAsBillingAddress" && field !== "postalCode") {
      if (shippingDetails[field] === "") {
        shippingErrText = "This is required";
      }

      if (billingDetails[field] === "") {
        billingErrText = "This is required";
      }
      return type === "shipping" ? shippingErrText : billingErrText;
    }
  } else {
    for (const key in shippingDetails) {
      if (key !== "shippingMode" && key !== "isSameAsBillingAddress" && key !== "postalCode") {
        shippingDetails[key] === "" ? isValid = false : null;
      }
    }

    for (const key in billingDetails) {
      if (key !== "shippingMode" && key !== "isSameAsBillingAddress" && key !== "postalCode") {
        billingDetails[key] === "" ? isValid = false : null;
      }
    }
    return isValid;
  }

  return null;
}