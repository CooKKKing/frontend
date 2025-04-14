import React from "react";
import Button from "../components/Button";

const ButtonTest = () => {
    return(
        <div className="space-y-4 p-4">
        {/* Small Buttons */}
        <div className="flex space-x-4">
          <Button size="small" variant="orange" value="value"/>
          <Button size="small" variant="green" value="value"/>
          <Button size="small" variant="orange" value="value" disabled />
        </div>
  
        {/* Medium Buttons */}
        <div className="flex space-x-4">
          <Button size="medium" variant="roundOrange" value="value"/>
          <Button size="medium" variant="roundGreen" value="value"/>
          <Button size="medium" variant="roundGreen" value="value" disabled />
        </div>
  
        {/* Large Buttons */}
        <div className="flex space-x-4">
          <Button size="large" variant="outlineOrange" value="value"/>
          <Button size="large" variant="outlineGreen" value="value"/>
          <Button size="large" variant="outlineOrange" value="value" disabled />
        </div>
  
        {/* Fit Buttons */}
        <div className="space-y-2">
          <Button size="fit" variant="orange" value="value"/>
          <Button size="fit" variant="green" value="value"/>
          <Button size="fit" variant="green" value="value" disabled />
        </div>
      </div>
    )
}

export default ButtonTest;