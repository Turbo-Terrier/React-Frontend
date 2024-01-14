import React from 'react';
import '../../css/feature-block.css'
import '../../css/swiper-icons.css'

function TurboTerrierFeatures() {

    const containerStyle = {
        borderBottom: '1px solid var(--bs-gray-500)'
    };

    const cardStyle = {
        height: '300px',
    };

    return (
        <div className="container py-4 py-xl-5" style={containerStyle}>
            <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                <div className="col">
                    <div className="card">
                        <div className="card-body p-4" style={cardStyle}>
                            <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center d-inline-block mb-3 bs-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-shield-lock-fill">
                                    <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0M0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5"></path>
                                </svg>
                            </div>
                            <h4 className="card-title">Security</h4>
                            <p className="card-text">Turbo Terrier was built with security and stability in mind. We take the utmost care into ensuring the security and privacy of your data while also minimizing requests to BU servers to ensure our application does not excessively stress the student link servers.</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card" style={cardStyle}>
                        <div className="card-body p-4">
                            <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center d-inline-block mb-3 bs-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-lightning-charge-fill">
                                    <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"></path>
                                </svg>
                            </div>
                            <h4 className="card-title">Beat the System</h4>
                            <p className="card-text">Robots hands faster than human hands. Beat the pesky hoarders, illegally holding a classes for their "friends" at Turbo speed. With our premium offerings, in the worst case, a class needs only be open for a little over 3 seconds for the bot to lock in!</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card" style={cardStyle}>
                        <div className="card-body p-4">
                            <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center d-inline-block mb-3 bs-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-peace">
                                    <path d="M7.5 1.018a7 7 0 0 0-4.79 11.566L7.5 7.793V1.018zm1 0v6.775l4.79 4.79A7 7 0 0 0 8.5 1.018zm4.084 12.273L8.5 9.207v5.775a6.97 6.97 0 0 0 4.084-1.691M7.5 14.982V9.207l-4.084 4.084A6.97 6.97 0 0 0 7.5 14.982M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path>
                                </svg>
                            </div>
                            <h4 className="card-title">Sleep in Peace</h4>
                            <p className="card-text">Instead of frantically checking the student link every hour for that one class you need to graduate, let the bot do the checking for you. Heck, you can even sleep in through your registration day for all I care! Bots aren't ever late to work :).</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TurboTerrierFeatures;
