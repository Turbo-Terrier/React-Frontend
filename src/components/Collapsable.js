import {Col, Collapse, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function Collapsable({id, title, children}) {
    return (
        <Row style={{ padding: '5px' }}>
            <Col>
                <Button
                    variant="primary"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls={"collapse-" + id}
                    href={"#collapse-" + id}
                    role="button"
                    style={{ width: '100%' }}
                >
                    {title}
                </Button>
                <Collapse id={"collapse-" + id}>
                    <div>
                        {children}
                    </div>
                </Collapse>
            </Col>
        </Row>
    )
}

export default Collapsable