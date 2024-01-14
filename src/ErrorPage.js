import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {Col, Row, Image} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import CatPic from './img/cat-pic.png'

const ErrorType = {
    NOT_FOUND: {
        "code": 404,
        "title": "NOT FOUND",
        "message": "The page you are looking for either no longer exists or was moved."
    },
    UNAUTHORIZED: {
        "code": 401,
        "title": "UNAUTHORIZED",
        "message": "You do not have permission to view this page (are you logged in?)."
    }
}

function ErrorPage({error_type}) {
    return (
        <>
            <Container className="py-4 py-xl-5">
                <Row className="mb-2">
                    <Col md={8} xl={6} className="text-center mx-auto">
                        <h1 className="fw-bold">Uh Oh Spaghettios!</h1>
                    </Col>
                </Row>
                <Row className="gy-4 gy-md-0">
                    <Col md={6} className="d-md-flex align-items-md-center justify-content-xl-end">
                        <div style={{ maxWidth: '350px' }}>
                            <h2 className="text-uppercase fw-bold"><strong>{error_type['code']} {error_type['title']}</strong></h2>
                            <p className="my-3 fs-5"> {error_type['message']} I bet that makes you sad. So here is a cool cat picture to cheer you up!</p>
                        </div>
                    </Col>
                    <Col md={6} className="text-start">
                        <div className="p-xl-5 m-xl-5">
                            <Image className="rounded img-fluid w-100 fit-cover" style={{ minHeight: '300px' }} src={CatPic} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export {ErrorPage, ErrorType}