import React, { useState } from "react";
import "../../styles/helpers/NodeMenu.sass";

function NodeMenu({ children, initialPrompt = null }) {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [prompt, setPrompt] = useState(initialPrompt || "⭘");

    const showDropdownMenu = () => {
        setDisplayMenu(true);
        !displayMenu && document.addEventListener("click", hideDropdownMenu);
        prompt !== initialPrompt && setPrompt("⭗");
    };
    const hideDropdownMenu = () => {
        setDisplayMenu(false);
        document.removeEventListener("click", hideDropdownMenu);
        prompt !== initialPrompt && setPrompt("⭘");
    };

    return (
        <div
            className={
                "NodeMenu" +
                (prompt !== initialPrompt ? " NodeMenu-default" : "")
            }
        >
            <p className="NodeMenu-prompt" onClick={showDropdownMenu}>
                {prompt}
            </p>
            {displayMenu && (
                <ul
                    className="NodeMenu-options"
                    style={{ opacity: displayMenu ? 1 : 0 }}
                >
                    {children}
                </ul>
            )}
        </div>
    );
}

export default NodeMenu;
