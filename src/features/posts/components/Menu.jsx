import {forceDownload} from "utils/forceDownload";
import React from "react";

const Menu = ({post, id, setShowMenu}) => {
    return (
        <>
          <div id={id} className="absolute -translate-x-1/2 mt-3 rounded-3xl p-3 bg-darkgray text-gray w-56 z-10 ">
              <ul className="flex flex-col shadow-2xl list-none">
                  <li onClick={() => forceDownload(post)} className="py-2 px-3 hover:bg-slate-500 rounded-2xl cursor-pointer">
                      Download Image
                  </li>
                  <li className="py-2 px-3 hover:bg-slate-500 rounded-2xl cursor-pointer">Report Post</li>
                  <li className="py-2 px-3 hover:bg-slate-500 rounded-2xl cursor-pointer">Report User</li>
                  <li className="py-2 px-3 hover:bg-slate-500 rounded-2xl cursor-pointer">Edit post</li>
                  <li className="py-2 px-3 hover:bg-slate-500 rounded-2xl cursor-pointer">Delete post</li>
              </ul>
          </div>
              <div onClick={() => setShowMenu(false)} className="fixed inset-0 z-[9]"></div>
        </>
    );
};

export default Menu;
