import React from "react";
import Button from "../components/Button";

const ButtonTest = () => {
    return(
        <div className="space-y-4 p-4">
        {/* Small Buttons */}
        <div className="flex space-x-4">
          <Button size="small" variant="orange" value="한글 테스트"/>
          <Button size="small" variant="green" value="지마켓 산스"/>
          <Button size="small" variant="orange" value="확인" disabled />
        </div>
  
        {/* Medium Buttons */}
        <div className="flex space-x-4">
          <Button size="medium" variant="roundOrange" value="medium"/>
          <Button size="medium" variant="roundGreen" value="medium"/>
          <Button size="medium" variant="roundGreen" value="medium" disabled />
        </div>
  
        {/* Large Buttons */}
        <div className="flex space-x-4">
          <Button size="large" variant="outlineOrange" value="large"/>
          <Button size="large" variant="outlineGreen" value="large"/>
          <Button size="large" variant="outlineOrange" value="large" disabled />
        </div>
  
        {/* Fit Buttons */}
        <div className="space-y-2">
          <Button size="fit" variant="orange" value="value"/>
          <Button size="fit" variant="green" value="value"/>
          <Button size="fit" variant="green" value="value" disabled />
        </div>

        {/* Fit Buttons */}
        <div className="space-y-2">
          <Button size="full" variant="orange" value="value"/>
          <Button size="full" variant="green" value="value"/>
          <Button size="full" variant="green" value="value" disabled />
        </div>
      </div>
    )
}

export default ButtonTest;