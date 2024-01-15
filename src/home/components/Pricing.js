import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Card, Badge, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import '../../css/pricing-duo-badges.css'
import Cookies from "js-cookie";
import {Disclaimer, DisclaimerStyle} from "../../components/Disclaimer";
import Modal from "react-bootstrap/Modal";
import GoogleLogo from "../../img/google-login-logo.jpg";
import popover from "bootstrap/js/src/popover";

function Pricing() {

    const containerStyle = {
        borderBottom: '1px solid var(--bs-gray-500)'
    };

    return (
        <Container className="py-4 py-xl-5" style={containerStyle} id={"pricing"}>
            <Row className="mb-4">
                <Col md={8} xl={6} className="text-center mx-auto">
                    <h2>Pricing</h2>
                    <p className="w-lg-50">
                        View our pricing table; final purchases can only be made on our account dashboard after logging in!
                    </p>
                </Col>
            </Row>
            <Row className="gy-4 gx-md-0 gy-md-0 row-cols-1 row-cols-md-2 row-cols-xl-3 d-md-flex d-xl-flex align-items-md-center">
                <DemoPricing/>
                <PremiumPricing/>
            </Row>
        </Container>
    );
}

function PremiumPricing({loggedInUser}) {

    let [tieredPricing, setTieredPricing] = useState([])
    let [quantity, setQuantity] = useState(3)

    let [unitPrice, setUnitPrice] = useState(-1)
    let [totalPrice, setTotalPrice] = useState(-1)

    let [openModal, setOpenModal] = useState(false)

    function incrementQuantity() {
        if (quantity === 16) {
            return
        }
        setQuantity(quantity + 1)
    }

    function decrementQuantity() {
        if (quantity === 1) {
            return
        }
        setQuantity(quantity - 1)
    }

    function prePurchaseConfirmation() {
        // todo purchase modal
    }

    useEffect(() => {
        getPricing().then((pricing) => {
            setTieredPricing(pricing)
        })
    }, [])
    useEffect(() => {
        function calculateUnitPrice() {
            let price = -1;
            for (let index in tieredPricing) {
                if (quantity >= tieredPricing[index]["required_quantity"]) {
                    price = tieredPricing[index]["unit_price"]
                }
            }
            if (price === -1 && tieredPricing.length > 0) {
                price = tieredPricing[tieredPricing.length - 1]["unit_price"]
            }
            return price
        }
        let up = calculateUnitPrice(quantity)
        setUnitPrice(up)
    }, [quantity, tieredPricing])

    useEffect(() => {
        setTotalPrice(unitPrice*quantity)
    }, [unitPrice, quantity])

    return (
        <Col>
            <Card className="text-white bg-primary border-0">
                <Card.Body className="p-4">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h3 className="fw-bold text-white mb-0">Premium</h3>
                            <p>With full <em>Turbo</em>!!</p>
                            <h4 className="display-6 fw-bold" style={{ marginBottom: 0, textAlign: 'center' }}>${unitPrice.toFixed(2)}<span className="fs-4 fw-normal text-light">/course</span></h4>
                            <p className="fw-semibold text-light" style={{ textAlign: 'center' }}>${totalPrice.toFixed(2)} total</p>
                        </div>
                        <div>
                            <Badge className="rounded-pill bg-dark fs-5 fw-semibold">Quantity: {quantity}</Badge>
                        </div>
                    </div>
                    <div>
                        <ul className="list-unstyled">
                            <ProductFeature desc={<>Up to 50 requests/minute
                                <Disclaimer
                                    id="2"
                                    style={DisclaimerStyle.STYLE_2}
                                    description="The requests minute is the number of times per minute the application asks BU is this course open. The higher this number, the smaller the chances you miss an open seat."
                                /> to check if a course is open
                                <Disclaimer
                                    id="3"
                                    style={DisclaimerStyle.STYLE_2}
                                    description="The listed request cap is for the entire application. Each course you are trying to register for requires its own request and so the more courses you try to register for, the slower the per-course request rate."
                                /> <Disclaimer
                                    id="4"
                                    style={DisclaimerStyle.STYLE_2}
                                    description="The per-course request rate is capped at 20 requests/minute for all users."
                                />
                                .</>} premium={true}/>
                            <ProductFeature desc={<>Cloud monitoring service that will watch 24/7 to make sure your bot is running and alert you to any problems
                                <Disclaimer
                                    id="5"
                                    style={DisclaimerStyle.STYLE_2}
                                    description="It is possible your device looses internet, powers off, or the application simply crashes. In such case, we will alert you via text, email, or a call so that you may the appropriate action."
                                />
                                .</>} premium={true}/>
                            <ProductFeature desc={<>Premium support for bugs, feature requests, and setup.</>} premium={true}/>
                        </ul>
                    </div>
                    <Row>
                        <Col className="d-flex justify-content-left">
                            <Button className="fs-6 fw-bolder d-block w-75 bg-white-300" role="button" onClick={decrementQuantity}>-</Button>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button className="fs-6 fw-bolder d-block w-75 bg-white-300" role="button" onClick={incrementQuantity}>+</Button>
                        </Col>
                    </Row>
                    {loggedInUser ? (
                        <>
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <PurchaseConfirm hook={[openModal, setOpenModal]} quantity={quantity} />
                                    <Button className="fs-6 fw-bolder d-block w-100 bg-white-300 m-2" role="button" onClick={() => setOpenModal(true)}>Purchase</Button>
                                </Col>
                            </Row>
                        </>
                    ) : ""}
                </Card.Body>
            </Card>
        </Col>
    )
}

function PurchaseConfirm(props) {
    let [canBuy, setCanBuy] = useState(false)
    let [openedModal, setOpenedModal] = props.hook
    let quantity = props.quantity

    async function purchase() {
        let endpoint = "http://localhost:8080/api/web/v1/create-checkout-session"
        let userOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate, br",
                "Authorization": Cookies.get("jwt-token")
            },
            body: JSON.stringify(quantity)
        }
        let result = await fetch(endpoint, userOptions)
        if (result.ok) {
            let json_resp = await result.json()
            document.location.href = json_resp
        } //todo: anytime not authorized logout
    }

    function updateBuy() {
        let box3 = document.getElementById("formCheck-3")
        if (box3.checked) {
            setCanBuy(true)
        } else {
            setCanBuy(false)
        }
    }

    const alreadyAgreed = (
        <Tooltip id="tooltip">
            You have already agreed to this when you created your account.
        </Tooltip>
    )

    return (
        <>
            <Modal show={openedModal} onHide={() => setOpenedModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Purchase</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            Please confirm your purchase of +{quantity} Premium Access credits.
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Button
                                variant="primary"
                                className={"d-flex justify-content-center align-items-center" + (canBuy ? "" : " disabled")}
                                disabled={!canBuy}
                                style={{width: '100%'}}
                                onClick={purchase}
                            >
                                Confirm Purchase
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <form>
                        <div className="form-check">
                            <OverlayTrigger trigger={["hover", "focus"]} placement="top-end" overlay={alreadyAgreed}>
                                <input checked readOnly className="form-check-input" type="checkbox" id="formCheck-1"/>
                            </OverlayTrigger>
                            <label className="form-check-label" htmlFor="formCheck-1">
                                I agree to abide by the <a href="/tos">Terms of Service</a>.
                            </label>
                        </div>
                        <div className="form-check">
                            <OverlayTrigger trigger={["hover", "focus"]} placement="top-end" overlay={alreadyAgreed}>
                                <input checked readOnly className="form-check-input" type="checkbox" id="formCheck-2"/>
                            </OverlayTrigger>
                            <label className="form-check-label" htmlFor="formCheck-2">
                                I have acknowledged the <a href="/privacy">Privacy Policy</a>.
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="formCheck-3" onClick={updateBuy}/>
                            <label className="form-check-label" htmlFor="formCheck-2">
                                I have acknowledged the <a href="/refunds">Refund Policy</a>.
                            </label>
                        </div>
                    </form>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function DemoPricing() {

    return (
        <Col className="offset-xl-2">
            <Card className="bg-body-tertiary border-0">
                <Card.Body className="p-4">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h3 className="fw-bold mb-0">Free Demo</h3>
                            <p>Try it risk-free!</p>
                            <h4 className="display-6 fw-bold">$0.00</h4>
                        </div>
                    </div>
                    <div>
                        <ul className="list-unstyled">
                            <ProductFeature desc={
                                <>
                                    Allows you to register for any one class
                                    <Disclaimer
                                        id="1"
                                        style={DisclaimerStyle.STYLE_1}
                                        description="Each unique BU user only gets 1 free trial course registration. After you have registered for one free course, you must switch to one of our premium plans to continue using Turbo Terrier."
                                    />.
                                </>
                            } premium={false}/>
                            <ProductFeature desc={<>Up to 5 requests/minute
                                <Disclaimer
                                    id="2"
                                    style={DisclaimerStyle.STYLE_1}
                                    description="The requests minute is the number of times per minute the application asks BU is this course open. The higher this number, the smaller the chances you miss an open seat."
                                /> to check if a course is open
                                <Disclaimer
                                    id="3"
                                    style={DisclaimerStyle.STYLE_1}
                                    description="The listed request cap is for the entire application. Each course you are trying to register for requires its own request and so the more courses you try to register for, the slower the per-course request rate."
                                />
                                .</>} premium={false}/>
                            <ProductFeature desc={<>Limited support for bugs only.</>} premium={false}/>
                        </ul>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

function ProductFeature({desc, premium}) {
    return (
        <li className="d-flex mb-2">
            <span className={"bs-icon-xs bs-icon-rounded bs-icon me-2 " + (premium ? "bs-icon-semi-white xs" : "bs-icon-primary-light")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"></path>
                </svg>
            </span>
            <span>{desc}</span>
        </li>
    )
}

async function getPricing() {
    let endpoint = "http://localhost:8080/api/web/v1/pricing"
    let userOptions = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br"
        },
    }
    let response = await fetch(endpoint, userOptions)
    return await response.json()
}

export {Pricing, PremiumPricing};
