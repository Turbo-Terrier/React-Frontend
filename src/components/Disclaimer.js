import {OverlayTrigger, Popover} from "react-bootstrap";
import React from "react";
import '../css/disclaimers.css'

const DisclaimerStyle = {
    STYLE_1: "disclaimer disclaimer-1",
    STYLE_2: "disclaimer disclaimer-2",
}

function Disclaimer({id, style, description}) {
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">⚠ Disclaimer {id}</Popover.Header>
            <Popover.Body>
                {description}
            </Popover.Body>
        </Popover>
    )

    return (
          <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={popover}>
              <sup className={style}>
                  {id}
              </sup>
          </OverlayTrigger>
    );
}

export {DisclaimerStyle, Disclaimer}