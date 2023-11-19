import React, { useEffect } from 'react';
import '../App.css';
import $ from 'jquery';

function Loader() {
    useEffect(() => {
        const loaderTimeout = setTimeout(() => {
            $('.loader_bg').fadeToggle('slow');
        }, 1600);

        return () => {
            clearTimeout(loaderTimeout);
        };
    }, []);

    return (
        <div className="loader_bg">
            <div className="loader"></div>
        </div>
    );
}

export default Loader;
