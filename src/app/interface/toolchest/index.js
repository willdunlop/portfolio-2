import dom from 'jsx-render';

import ToolMenu from './menu';

import constants from '../../../config/constants';
import helpers from '../../../config/helpers';


class Toolchest {
    constructor(props) {
        this.props = props;

        this.toolchest;
        this.menu;
        this.activeMenu;
        this.programs;

        this.render = this.render.bind(this);
    }

    

    populateMenu(menuType) {
        this.activeMenu = menuType;
        this.menu.innerHTML = '';
        constants.programs.all.forEach(item => {
            if(menuType === item.type) {
                let itemElem;
                const itemElement = <li ref={elm => itemElem = elm} className="toolchest__menu-item">{item.title}</li>;
                itemElem.onclick = () => this.props.openWindow(item);
                this.menu.appendChild(itemElement)
            }
        });
    }

    showMenu(menuType, menuButton) {

        if (this.activeMenu != menuType) this.populateMenu(menuType);
        // position menu by comparing it to buttonElem.offsetTop
        this.menu.style.top = (menuButton.offsetTop - this.menu.clientHeight / 4) + 'px';
        this.menu.style.left = this.toolchest.clientWidth + 'px';
        this.menu.style.display = "block";

    }

    render() {
        const jsx =
            <div ref={elm => { this.toolchest = elm }} className="toolchest animated zoomIn" tabindex="1">
                <div id="dragHeader" className="toolchest__header">Toolchest</div>
                {constants.toolchest.menuTypes.map(type => {
                    let menuItem;

                    const menuItemTitle = `${type[0].toUpperCase()}${type.slice(1)}`; // first letter of string to UC
                    const buttonElement = <div ref={elm => menuItem = elm} className="toolchest__btn">{menuItemTitle}</div>;
                    menuItem.onclick = () => this.showMenu(type, buttonElement);
                    return buttonElement;
                })}

                <ul ref={elm => this.menu = elm} className="toolchest__menu"></ul>
            </div>;
    
        helpers.ui.dragElement(this.toolchest, "toolchest")
        this.toolchest.onblur = () => this.menu.style.display = 'none';

        return jsx;
    }
}

export default Toolchest;