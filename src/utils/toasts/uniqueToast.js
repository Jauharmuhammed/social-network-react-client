import React from "react";
import classNames from "classnames";
import toast from "react-hot-toast";

import styles from "../../App.module.css";

const uniqueToast = ({ imageUrl, text = '' }) =>
  toast.custom(
    (t) => (
      <div
        className={classNames([
          styles.notificationWrapper,
          t.visible ? "top-0" : "-top-96",
        ])}
      >
        <div className={styles.imageWrapper}>
          <img
            src={imageUrl}
            alt=""
          />
        </div>
        <div className={styles.contentWrapper}>
          <p>
            {text}
          </p>
        </div>
        {/* <div className={styles.closeIcon} onClick={() => toast.dismiss(t.id)}>
          <MdOutlineClose />
        </div> */}
      </div>
    ),
    { id: "unique-notification", position: "top-center" }
  );


export default uniqueToast