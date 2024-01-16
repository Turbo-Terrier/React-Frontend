import Form from "react-bootstrap/Form";
import {OverlayTrigger, Popover} from "react-bootstrap";
import React from "react";
import "../css/form-label.css"
import ClarificationPopover from "./ClarificationPopover";

function Switch({label, description, switched, disabled, onClick}) {


    return (
        <Form.Check type="switch">
            <Form.Check.Input type="checkbox" className="form-check-input" disabled={disabled} checked={switched} onChange={onClick}/>
            <Form.Check.Label className="form-check-label">
                {label}&nbsp;&nbsp;
                {description && <ClarificationPopover description={description}/>}
            </Form.Check.Label>
        </Form.Check>
    )
}

export default Switch