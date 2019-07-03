import dom from 'jsx-render';
import Picker from 'vanilla-picker';

import Software from '../../personal';
import helpers from '../../../config/helpers';

import TitleCollapser from '../../common/title-collapser';


class Appearance {
    constructor(props) {
        this.props = props;

        console.log("props", props)
        
        this.settingsForm;
        this.applyBtn;


        this.theme = {
            name: "Monet",
            id: "they will need id's",
            colors: {
                font: { primary: '#ffffff', secondary: '#000000' },
                primary: { light: '#c2c3e4', base: '#8379bd', dark: '#332d47'},
                secondary: { light: '#c8b0c0', base: '#8b597b', dark: '#34232e' },
                menu: { light: '#d3c0cd', base: '#c8b0c0', dark: '#a08d9a' },
                highlight: { light: '#7a8e8c', base: '#415d5a', dark: '#4e413f' },
                inactive: { light: '#a9aaa9', base: '#5a5d5a', dark: '#1c1c1c' },
            },
        }

        this.applyTheme = this.applyTheme.bind(this);
        this.render = this.render.bind(this);
    }

    applyTheme() {
        //  Update Json
        //  Set global color variables
        //  save under users profile
        console.log("changing theme")
        const root = document.documentElement;
        // root.style.setProperty("transition", "background-color 1s linear");
        Object.keys(this.theme.colors).forEach(colorKey => {
            Object.keys(this.theme.colors[colorKey]).forEach(shade => {
                let colorVar = `--color-${colorKey.toLowerCase()}`;
                if (shade !== "base") colorVar += `-${shade}`;
                root.style.setProperty(colorVar, this.theme.colors[colorKey][shade]);
            });
        })
    }
    
    rendercColorBtns(colorObject, colorName) {
        return Object.keys(colorObject).map(key => {
            let colorBtn;
            let colorCode;
            const colorBtnJSX =
                <button 
                    ref={elm => colorBtn = elm}
                    className={`appearance__color-btn appearance__${colorName.toLowerCase()}-${key}-btn`}
                >
                    <p>{colorName} {helpers.firstLetterUppercase(key)}</p>
                    <span ref={elm => colorCode = elm} >{colorObject[key]}</span>
                </button>;
    
                colorBtn.style.borderTopColor = helpers.shadeColor(colorObject[key], 0.3);
                colorBtn.style.borderLeftColor = helpers.shadeColor(colorObject[key], 0.3);
                colorBtn.style.borderRightColor = helpers.shadeColor(colorObject[key], -0.3);
                colorBtn.style.borderBottomColor = helpers.shadeColor(colorObject[key], -0.3);
    
                const colorPicker = {
                    title: "Color Picker",
                    slug: "colorPicker",
                    content: () => Software.Basic({ interface: 'yo sup'})
                }
    
                colorBtn.onclick = () => helpers.ui.openWindow(colorPicker, { isResizable: false, dragOnly: true });
    
    
            return colorBtnJSX;
        })
            
            
    }

    render() {
        const themes = [ 'Monet', 'Indigo', 'Custom'];
    
        const jsx =
            <div className="basic">
                <div className="appearance">
                    <div className="appearance__theme-selector">
                        <ul className="appearance__theme-list">
                            {themes.map(theme => {
                                let themeElm;
                                const themeJsx = <li ref={elm => themeElm = elm} className="appearance__theme-list-item" tabindex="1">{theme}</li>
                                // themeElm.onclick = () => themeElm.classList // todo - apply class here instead of focus/blur
                                return themeJsx;
                            })}
                        </ul>
                    </div>

                    <div className="appearance__settings">

                        <TitleCollapser title="Preview" elementId="appearanceSettingsPreview" />
                        <div id="appearanceSettingsPreview" className="appearance__settings-preview">
                            
                        </div>

                        <TitleCollapser title="Customise" elementId="appearanceSettingsForm" />
                        <div ref={elm => this.settingsForm = elm} id="appearanceSettingsForm" className="appearance__settings-form">
                            <div className="row">
                                <span>Theme Name:</span>
                                <input type="text" className="text-input" value={this.theme.name} />
                            </div>

                            <div className="row">
                                <span>Wallpaper: None</span>
                                <button className="button primary-button">Browse</button>
                            </div>

                            <div className="appearance__settings-indent">
                                <div className="row">
                                    <h2 className="appearance__settings-heading">Colors</h2>
                                </div>
                                {Object.keys(this.theme.colors).map(colorKey => 
                                    <div className="row row--center appearance__settings-row">
                                        {this.rendercColorBtns(this.theme.colors[colorKey], helpers.firstLetterUppercase(colorKey))}
                                    </div>
                                )}
                            </div>

                            <div className="row">
                                <div className="button-container button-container--right">
                                    {/* Add outer indedent to main button*/}
                                    <button ref={elm => this.applyBtn = elm} className="button primary-button">Apply</button>
                                    <button className="button secondary-button">Reset</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>;
    
        this.applyBtn.onclick = this.applyTheme;
    
        return jsx;
    }
}

export default Appearance;