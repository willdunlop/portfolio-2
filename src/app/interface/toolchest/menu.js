import dom from 'jsx-render';


const ToolMenu = props => {
    let menu;

    const jsx = <ul ref={elm => menu = elm} className="toolchest__menu">
                    <li>{props.data}</li>
                </ul>;

    return jsx;
}

export default ToolMenu;