import React from 'react';

const Info = () => {
  return (
    <div className="flex justify-center items-center mt-[40px] rounded-lg p-6 bg-white">
      <div className="flex flex-col md:flex-row items-center md:gap-[80px] text-center">
        <img
          src="/img/generated-image.png"
          alt="99+"
          className="w-[150px] h-[150px] object-contain"
        />
        <p className="text-gray-800 text-lg font-medium text-[20px] md:text-[32px] leading-normal">
          <span>This platform supports over <span className="font-bold">99 languages</span></span>
          <br />
          <span> for example, English, Hindi, German, </span>
          <br />
          <span>French, etc and delivers <span className="font-bold">99% accurate audio</span>.</span>
        </p>
      </div>
    </div>
  );
};

export default Info;
