import { Accordion, Card, Button, Container } from 'react-bootstrap';

function Faq() {
    return (
        <Container fluid className={"py-4 py-xl-5"} id={"faq"}>
            <section>
                <div className="row" style={{ marginBottom: '24px', marginTop: '12px' }}>
                    <div className="col-md-8 col-xl-6 text-center mx-auto">
                        <h2>FAQ</h2>
                        <p className="w-lg-50">Frequently Asked Questions answering your most pressing concerns!</p>
                    </div>
                </div>
                <Container fluid>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <Accordion id="faqlist" flush>
                                <FAQItem
                                    question={"How does Turbo Terrier compare with BU Ninja?"}
                                    answer={
                                        <>
                                            <b>Turbo Terrier:</b>
                                            <ul>
                                                <li>Runs on your device</li>
                                                <li>More complicated setup process</li>
                                                <li>Registers you for the course with in seconds of it opening</li>
                                                <li>Slightly more expensive</li>
                                                <li>Definitely cooler website</li>
                                            </ul>
                                            <b>BU Ninja:</b>
                                            <ul>
                                                <li>Runs in the cloud</li>
                                                <li>Relatively simple setup</li>
                                                <li>Only alerts you about a course opening (with significant delay)</li>
                                                <li>Slightly cheaper</li>
                                                <li>Less cooler website</li>
                                            </ul>
                                            <b>Both:</b>
                                            <ul>
                                                <li>Tools to help you register for your desired course(s)</li>
                                                <li>Monitor or register for multiple courses at a time</li>
                                                <li>You pay per course with your first course free</li>
                                                <li>Discounts on bulk purchases</li>
                                            </ul>
                                        </>
                                    }
                                    id={1}
                                />
                                <FAQItem
                                    question={"I don't want to have to run this bot on my device. Can't you run it for me?"}
                                    answer={
                                        <>
                                            <b>Short answer</b>: No.
                                            <br></br>
                                            <b>Long answer</b>: According to the Boston University's <a href="https://www.bu.edu/policies/acceptable-use-of-computing-services-policy/">
                                            Acceptable Use of Computing Service Policy</a>, it is explicitly forbidden to give your kerberos credentials to any
                                            person for any reason. However, Turbo Terrier requires your kerberos login credentials to log on to the student link.
                                            As a result, the only way for Turbo Terrier to operate with out violating university policy is if the application operates
                                            on your personal device.
                                        </>
                                    }
                                    id={2}
                                />
                                <FAQItem
                                    question={"Do you have access to my kerberos credentials?"}
                                    answer={
                                        <>
                                            No. As indicated in the previous item, we do not have access to your BU credentials. Your BU credentials never
                                            leave your personal device except to log on to the student link.
                                        </>
                                    }
                                    id={3}
                                />
                                <FAQItem
                                    question={"Do you give any refunds?"}
                                    answer={
                                        <>
                                            Turbo Terrier has a trial period to allow you to evaluate our application before purchasing. However, in many cases, we still
                                            allow for refunds even after purchase as described in our <a href={"/refund"}>Refund Policy</a>.
                                        </>
                                    }
                                    id={4}
                                />
                                <FAQItem
                                    question={"Why do you cap the requests to check for open courses? Can't we have 9999 requests/minute so we can never miss an open course slot?"}
                                    answer={
                                        <>
                                            Unfortunately, no. There are two primary reasons we cap the number of requests you make to check for open courses.
                                            <ol>
                                                <li>To prevent an absurdly high CPU usage on your device (and allow you to do other stuff on your device while the Bot runs).</li>
                                                <li>To protect university resources. Sending too many requests per second can overwhelm the BU student link.</li>
                                            </ol>
                                        </>
                                    }
                                    id={5}
                                />
                                <FAQItem
                                    question={"Woah, that's a really cool logo. What does it mean?"}
                                    answer={
                                        <>
                                            I KNOW RIGHT!? Isn't that logo just amazing. At the bottom of the logo, we have a book which represents academics and courses. Then we
                                            have a zig-zag line that's supposed to look like a lightning bolt. It represents the speed and capabilities of Turbo Terrier to get you into
                                            your course. Its the "Turbo" part in "Turbo Terrier" if you will. And finally the "dog" is supposed to be a Terrier even if it doesn't exactly
                                            look like a Terrier (but we can pretend!). The Terrier of course represents everything that's BU related! Thank you for your interest in our
                                            beautiful logo.
                                        </>
                                    }
                                    id={6}
                                />
                                <FAQItem
                                    question={"Where can I contact you?"}
                                    answer={
                                        <>
                                            The fastest way to reach us is to register an account on Turbo Terrier and fill out a contact form found on our management dashboard
                                            (which you must login to access). However, alternatively, you can also email us at <a href="mailto:support@turboterrier.com">support@turboterrier.com</a>.
                                        </>
                                    }
                                    id={7}
                                />
                            </Accordion>
                        </div>
                    </div>
                </Container>
            </section>
        </Container>
    );
}

function FAQItem({id, question, answer}) {
    return (
        <Card className="border rounded-0">
            <Accordion.Item eventKey={id}>
                <Accordion.Header>{question}</Accordion.Header>
                <Accordion.Body>
                    {answer}
                </Accordion.Body>
            </Accordion.Item>
        </Card>
    )
}

export default Faq;
