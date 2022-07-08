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

export const cardExpirationValidator = (expirationDate) => {
  let today = new Date();
  let thisYrStr = today.getFullYear().toString();
  let dataStr = JSON.parse(JSON.stringify(expirationDate));
  let month = parseInt(dataStr.split("/")[0]); // 1 - 12
  let year = parseInt(dataStr.split("/")[1]); // 23
  let yrUnit = thisYrStr.substring(0, thisYrStr.length - 2);

  if (month > 0 && month < 13) {
    
    let expDate = new Date(parseInt(yrUnit + year), month - 1);
    if (today.getTime() > expDate.getTime()) {
        return "Your Card is expired. Please check expiry date.";
    } else {
      return "";
    }
  } else {
    return "Expiration date is invalid";
  }
}

export const cardNumberValidator = (cardNumber) => {
  let dataStr = JSON.parse(JSON.stringify(cardNumber));
  return dataStr.replace(/[" "]/g, "").length !== 16 ? "Card number is invalid" : "";
}

export const cvcValidator = (securityCode) => {
  let dataStr = JSON.parse(JSON.stringify(securityCode));
  return dataStr.length !== 3 ? "Security code is invalid" : "";
}

export const checkoutPaymentValidator = (field = "", paymentDetails) => {
  let isValid = true;
  let paymentErrText = '';

  if (field !== "") {
    if (field !== "isSavePaymentInfo") {
      if (paymentDetails[field] === "") {
        paymentErrText = "This is required";
      } else {
        if (field === "expirationDate" && cardExpirationValidator(paymentDetails.expirationDate) !== "") {
          paymentErrText = cardExpirationValidator(paymentDetails.expirationDate);
        }

        if (field === "cardNumber" && cardNumberValidator(paymentDetails.cardNumber) !== "") {
          paymentErrText = cardNumberValidator(paymentDetails.cardNumber);
        }

        if (field === "securityCode" && cvcValidator(paymentDetails.securityCode) !== "") {
          paymentErrText = cvcValidator(paymentDetails.securityCode);
        }
      }

      return paymentErrText;
    }
  } else {
    for (const key in paymentDetails) {
      if (key !== "isSavePaymentInfo") {
        paymentDetails[key] === "" 
          ? isValid = false 
          : (key === "expirationDate" && cardExpirationValidator(paymentDetails.expirationDate) !== "") || 
            (key === "cardNumber" && cardNumberValidator(paymentDetails.cardNumber) !== "") || 
            (key === "securityCode" && cvcValidator(paymentDetails.securityCode) !== "")
            ? isValid = false
            : null;
      }
    }

    return isValid;
  }

  return null;
}