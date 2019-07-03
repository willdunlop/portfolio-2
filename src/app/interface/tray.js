import dom from 'jsx-render';

import helpers from '../../config/helpers';

const Tray = props => {
    let tray;

    const jsx = <ul ref={elm => tray = elm} id="tray" className="tray"></ul>;
    
    helpers.ui.dragElement(tray, "simple")

    return jsx;
}

export default Tray;