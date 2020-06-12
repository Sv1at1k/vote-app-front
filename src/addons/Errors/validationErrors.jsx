import React, { useEffect, useState } from "react";
import "./validationErrors.scss"
const Errors = ({ error, touched }) => {
    const errorData = error && touched ?
        <div className ="error">{error}</div>
        : "";
    return errorData
}

export default Errors;