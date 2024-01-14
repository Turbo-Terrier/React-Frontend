import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import '../../css/pricing-duo-badges.css'

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
                        View our pricing table, final purchases can only be made on our account dashboard after logging in!
                    </p>
                </Col>
            </Row>
            <Row className="gy-4 gx-md-0 gy-md-0 row-cols-1 row-cols-md-2 row-cols-xl-3 d-md-flex d-xl-flex align-items-md-center">
                <DemoPricing/>
                <PremiumPricing/>
            </Row>
            <Row>
                <Footnotes/>
            </Row>
        </Container>
    );
}

function PremiumPricing() {

    let [quantity, setQuantity] = useState(3)

    let [unitPrice, setUnitPrice] = useState(-1)
    let [totalPrice, setTotalPrice] = useState(-1)

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

    useEffect(() => {
        function calculateUnitPrice() {
            if (quantity <= 1) {
                return 7
            } else if (quantity <= 2) {
                return 6
            } else if (quantity <= 3) {
                return 5.5
            } else if (quantity <= 4) {
                return 5
            } else if (quantity <= 5) {
                return 4.5
            } else {
                return 4
            }
        }
        let up = calculateUnitPrice(quantity)
        setUnitPrice(up)
    }, [quantity])

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
                            <ProductFeature desc={<>Unlimited Registrations for the purchased semester.</>} premium={true}/>
                            <ProductFeature desc={<>Up to 50 requests/minute
                                <sup><a href={"#footnote-2"} className="footnote" >2</a> </sup>
                                to check if a course is open
                                <sup><a href={"#footnote-3"} className="footnote">3</a> </sup>
                                .</>} premium={true}/>
                            <ProductFeature desc={<>Cloud monitoring service that will watch 24/7 to make sure your bot is running and alert you to any problems
                                <sup><a href={"#footnote-5"} className="footnote">5</a></sup>
                                .</>} premium={true}/>
                            <ProductFeature desc={<>Premium support for bugs, feature requests, and setup.</>} premium={true}/>
                        </ul>
                    </div>
                    <Row>
                        <Col><Button className="btn-primary fs-6 fw-bolder d-block w-100 bg-white-300" role="button" onClick={decrementQuantity}>-</Button></Col>
                        <Col><Button className="btn-primary fs-6 fw-bolder d-block w-100 bg-white-300" role="button" onClick={incrementQuantity}>+</Button></Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )
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
                            <ProductFeature desc={<>Allows you to register for any 1 class
                                <sup><a href={"#footnote-1"}>1</a></sup>
                                .</>} premium={false}/>
                            <ProductFeature desc={<>Up to 5 requests/minute
                                <sup><a href={"#footnote-2"}>2</a> </sup>
                                to check if a course is open
                                <sup><a href={"#footnote-3"}>3</a> </sup>
                                .</>} premium={false}/>
                            <ProductFeature desc={<>Limited support for bugs only.</>} premium={false}/>
                        </ul>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

function Footnotes() {
    return (
        <Col md={9} xl={8} className="text-justify mx-auto">
            <ul className="list-unstyled text-secondary">
                <ProductFootnote id="1" desc="Each unique BU user only gets 1 free trial course registration. After you have registered for one free course,
                            you must switch to one of our premium plans to continue using Turbo Terrier." />
                <ProductFootnote id="2" desc="The requests minute is the number of times per minute the application asks BU is this course open.
                            The higher this number, the smaller the chances you miss an open seat." />
                <ProductFootnote id="3" desc="The listed request cap is for the entire application. Each course you are trying to
                            register for requires its own request and so the more courses you try to register for, the slower the per-course
                            request rate." />
                <ProductFootnote id="4" desc="The per-course request rate is capped at 20 requests/minute for all users." />
                <ProductFootnote id="5" desc="It is possible your device looses internet, powers off, or the application simply crashes. In such case, we will alert you via text, email, or a call so that you may the appropriate action." />
            </ul>
        </Col>
    )
}

function ProductFootnote({id, desc}) {
    return (
        <li id={"footnote-" + id} style={{margin: "12px"}}>
            <sup>{id}</sup> {desc}
        </li>
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

export default Pricing;
