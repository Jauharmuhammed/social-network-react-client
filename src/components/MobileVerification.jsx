import React, { useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";

const MobileVerification = () => {

  const MOBILE_REGEX = /^[0-9]{10}$/;

  const [mobile, setMobile] = useState("");
  const [mobileErr, setMobileErr] = useState("");

  useEffect(() => {
    const result = MOBILE_REGEX.test(mobile);
    if (!result && mobile) {
      setMobileErr("Please enter a 10 digit mobile number.");
    } else {
      setMobileErr("");
    }
  }, [mobile]);

  return (
    <div>
      <input
        type="text"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Mobile Number"
        autoComplete="on"
        // pattern="\d{10}"
        // title="Please enter exactly 10 digits"
        className={`w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300  ${
          mobileErr ? "border-red-700" : "mb-5 "
        }`}
      />
      {mobileErr && (
        <p className="text-red-700  my-1 flex ml-2 items-center text-sm">
          <BiErrorCircle />
          &nbsp;{mobileErr}
        </p>
      )}
    </div>
  );
};

export default MobileVerification;
