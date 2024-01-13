function HomeIntro() {
    const containerStyle = {
        paddingLeft: '18px',
        paddingRight: '18px',
        paddingTop: '24px',
    };

    const buttonStyle = {
        borderRadius: '5px',
    };

    return (
        <div className="container d-xxl-flex justify-content-xxl-center" style={containerStyle} data-bs-target="#home">
            <div className="row gy-4 mb-5">
                <div className="col-md-8 col-xl-6 col-xxl-11 text-start mx-auto">
                    <h2 style={{ textAlign: 'left' }}>What is Turbo Terrier?</h2>
                    <p className="w-lg-50" style={{ textAlign: 'left' }}>
                        Turbo Terrier is an automatic course registration bot created for Boston University students. The
                        application runs locally on your device, so in order to use it, you must download the Turbo Terrier
                        software and run it on your computer. Your first course is free!
                    </p>
                    <p style={{ textAlign: 'left' }}>
                        <strong>Here is how it works:</strong>
                        <br />
                        1. Begin by registering an account on this site by clicking the{' '}
                        <button className="btn btn-secondary" type="button" style={buttonStyle}>
                            Login/Register
                        </button>
                        &nbsp;button on our site navbar.
                        <br />
                        2. Log in to your <a href="bu.edu">@bu.edu</a> Gmail account to continue and authorize Turbo Terrier.
                        Non-BU accounts will be rejected from registration.
                        <br />
                        3. Follow instructions that will be provided to you on the user dashboard and set up the application on
                        your computer and select the courses you want to register.
                        <br />
                        4. After you launch the application, the bot will check every few seconds to see if your course has
                        opened up. If it has, it will register instantly.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomeIntro;
