import React from 'react';

function Footer() {
    return (
        <footer className="flex justify-around items-center bg-gray-200 h-[5%] 2xl:h-[10%]  ">
            <div className="flex justify-start ">
                <img
                    className=" hidden lg:flex justify-center items-center lg:w-12 lg:h-12 2xl:w-20 2xl:h-20  "
                    src="https://cordoba.gob.ar/wp-content/uploads/2023/12/cropped-Logo-Color_Mesa-de-trabajo-1-80x80.png"
                    alt="cropped-Logo-Color_Mesa-de-trabajo-1.png"
                    title="cropped-Logo-Color_Mesa-de-trabajo-1.png"
                ></img>
            </div>
            
            <div className="flex justify-center items-center h-6 text-black font-bold font-[Maven Pro]  text-xs   2xl:text-xl">
                <p className=' text-center flex justify-center items-center' >
                    &copy; Copyright 2024 -Desarrollado para CPC N° 15
                    Capdevila
                </p>
            </div>
            <div className="hidden lg:flex justify-start  ">
                <img
                    src="https://cordoba.gob.ar/wp-content/uploads/2020/08/logo-celeste-txt.svg"
                    className="w-28 h-28 2xl:w-52 2xl:h-40"
                    alt=""
                    decoding="async"
                ></img>
            </div>
        </footer>
    );
}

export default Footer;
