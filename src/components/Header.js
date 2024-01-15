
import Logo from '../img/no-bg-logo.png'

function Header() {
    const containerStyle = {
        background: 'linear-gradient(31deg, rgb(1,17,30), rgb(13,36,62) 63%, rgb(46,70,92)), linear-gradient(31deg, rgb(1,17,30), rgb(13,36,62) 63%, rgb(46,70,92))',
    };

    const logoStyle = {
        width: '200px',
        height: '200px',
        margin: '25px'
    };

    const hrStyle = {
        height: '8px',
        background: 'var(--bs-body-bg)'
    };

    return (
        <div className="container-fluid d-flex d-xl-flex justify-content-center heading-container py-2 py-md-4 py-lg-5" style={containerStyle}>
            <div className="row d-lg-flex accordion-header">
                <div className="col d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center">
                    <img className="d-sm-flex" src={Logo} style={logoStyle} alt="Logo" />
                </div>
                <div className="col d-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center" style={{ paddingBottom: '24px', paddingRight: '0px', paddingLeft: '0px' }}>
                    <div className="row d-inline-block">
                        <div className="col d-flex justify-content-center">
                            <h1 className="display-2 text-nowrap text-light d-sm-flex d-xl-flex">Turbo Terrier</h1>
                        </div>
                        <div className="col">
                            <hr className="d-block" style={hrStyle}></hr>
                        </div>
                        <div className="col d-flex justify-content-center">
                            <h1 className="display-6 text-nowrap text-light">The BU Registration Bot</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;