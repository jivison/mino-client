import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/helpers/DropdownMenu.sass"

function DropdownMenu({ isNodeMenu = false, id, title, children }) {
    const [displayMenu, setDisplayMenu] = useState(false);

    const showDropdownMenu = () => {
        if (!isNodeMenu) {
            let caretStyle = document.getElementById(id).querySelector(".caret")
                .style;
            caretStyle.transform = "rotate(0deg)";
            caretStyle.marginTop = "0";
            caretStyle.marginBottom = "1em";
        }

        setDisplayMenu(() => {
            document.addEventListener("click", hideDropdownMenu);
            return true;
        });
    };

    const hideDropdownMenu = () => {
        if (!isNodeMenu) {
            let caretStyle = document.getElementById(id).querySelector(".caret")
                .style;
            caretStyle.transform = "rotate(-180deg)";
            caretStyle.marginTop = "1em";
            caretStyle.marginBottom = "0";
        }

        setDisplayMenu(() => {
            document.removeEventListener("click", hideDropdownMenu);
            return false;
        });
    };

    return (
        <div className="dropdown" id={id}>
            <div className="button" onClick={showDropdownMenu}>
                <p>{isNodeMenu ? "○" : title}</p>
                {!isNodeMenu && <p className="caret">&#8248;</p>}
            </div>

            {displayMenu && (
                <ul
                    className="dropdown-options"
                    style={{ opacity: displayMenu ? 1 : 0 }}
                >
                    {children}
                </ul>
            )}
        </div>
    );
}

DropdownMenu.propTypes = {
    // children
    isNodeMenu: PropTypes.bool,
    title: PropTypes.string
};

export default DropdownMenu;
