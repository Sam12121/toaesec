import { Outlet } from 'react-router-dom';
import { cn } from 'tailwind-preset';
import { Card } from 'ui-components';

import AuthBg from '@/assets/auth-bg.svg';

const ToaeLogo = () => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 58 38"
    width="58"
    height="48"
  >
    <style>
      {
        '.st4{display:none}.st5{display:inline;fill:#1a4275}.st6{font-family:"Montserrat-ExtraBold"}.st7{font-size:31.4862px}.st8{letter-spacing:6.4}.st9{fill-rule:evenodd;clip-rule:evenodd}.st10,.st9{display:inline;fill:#42a7d7}.st11{font-family:"Montserrat-Bold"}.st12{font-size:8.8146px}'
      }
    </style>
    <path
      d="M16.9 2.8C24 .1 31 .1 38 2.9c-7 0-14.1.1-21.1-.1z"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "#194275",
      }}
    />
    <path
      d="M30.5 35.4c-1 .7-2 1.2-3 1.8-.1.1-.2.1-.4 0-1-.5-1.9-1-3-1.8h6.4z"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "#1b4375",
      }}
    />
    <path
      d="M50.3 18.9c-.3-.8-.9-1.4-1.5-2-1-.8-2.1-1.5-3.3-1.9-.6-.2-.7-.6-.6-1.2.4-2.3.5-4.6.4-6.9 0-.2 0-.5-.2-.6-1.1-.6-2.2-1.3-3.4-2-.2 1.4-.2 2.7-.3 4 0 .3.1.8-.3.8s-.4-.4-.4-.7c0-.1 0-.3-.1-.4-.1-1-.7-1.6-1.6-2-.7-.3-1.3-.4-2.1-.5-2-.2-4.1 0-6.1-.2-.6-.1-.8.1-.8.7v16c0 3.3-.1 6.5.2 9.8.1.7.2 1.4.6 1.9.5.7 1 .8 1.7.3.9-.7 1.7-1.3 2.5-2 1.3-1.1 2.5-2.3 3.6-3.8-1.7.1-5.8.4-5.7.3 1.4-.3 2.8-.5 4.2-.8 2.4-.5 4.7-1.2 6.8-2.5.7-.4 1.5-.9 2-1.6v-.2c.3-.3.4-.6.5-.9.1-.2.1-.4.1-.6v-.2c-.2.4-.7 1-.7 1-1.5 1.7-3.6 2.5-5.8 3.3 1.5-2.2 2.6-4.5 3.4-6.9.2-.5.1-.7-.4-.9-1.4-.5-2.8-.9-4.3-1.1-2.3-.4-4.7-.6-7.1-.6-.5 0-.7-.1-.6-.6v-2.4c0-.4.1-.6.6-.6.7.1 1.5.1 2.2.1 3.7.3 7.2.9 10.7 2.2 1.8.7 3.5 1.5 4.8 3 .1.2.6.8 1.1 1.9.2-.3 0-.9-.1-1.2z"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "#42a7d7",
      }}
    />
    <path
      d="M24.6 5.9c0-.4-.1-.6-.6-.6-2.4.1-4.7.1-7.1.2-1.7.1-3.1.7-3.6 2.5-.1.3-.1.7-.6.6-.5-.1-.4-.5-.3-.8 0-.5.1-.9.2-1.4.1-.7.2-1.3.4-2.1-1.1.6-2 1.2-3 1.7-.4.2-.5.5-.5.9-.1 1.4.1 2.8.1 4.3 0 .4.1.5.5.3.7-.3 1.4-.5 2.1-.7 3-.9 6-1.5 9-1.5.3 0-2.9.8-4.3 1.1-2.5.6-4.9 1.4-7 2.9-.4.3-.9.6-1.2 1 0 0-.2.2-.4.7 0 0 0 .1-.1.1-.1.1-.1.3-.1.4v.2c0 .3-.1.6 0 .9 0 0-.1-.8.9-1.8.3-.3.5-.5.8-.7.2.2.2.4.2.5.2 1.5.5 2.9 1.1 4.3.1.3.2.4.5.5.7.2 1.3.5 2 .6 3 .8 6.1 1 9.2 1.1.7 0 .8.2.8.8V24c0 .6-.1.8-.7.7-1-.1-1.9-.1-2.9-.2-3.8-.3-7.5-1-11-2.6-1.5-.7-3-1.5-4.1-2.9-.5-.5-.9-1.4-.9-1.4.2 1.4.9 2.3.9 2.3.5.8 1.2 1.4 2.1 1.9 1.8 1.2 3.8 1.9 5.9 2.5.5.1.9.4 1.1.8 2.1 3.6 5 6.5 8.3 8.9.8.6 1.4.4 1.9-.5.4-.8.4-1.7.5-2.5 0-8.4-.1-16.8-.1-25.1z"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "#1a4275",
      }}
    />
  </svg>

  );
};
export const AuthLayout = () => {
  return (
    <div
      className="grid h-screen place-items-center overflow-auto"
      style={{
        background: `url("${AuthBg}") no-repeat center center`,
        backgroundSize: 'cover',
        backgroundColor: '#150C58',
      }}
    >
      <div className="relative">
        <div className="h-full grid place-items-center">
          <div className="flex mt-4">
            <ToaeLogo />
            <span className="dark:text-text-input-value text-h2 font-normal ml-1">
              TOAE Security
            </span>
          </div>
          <Card
            className={cn('w-[360px] px-14 py-12 my-4 rounded-[15px] dark:bg-bg-page/70')}
          >
            <Outlet />
          </Card>
        </div>
      </div>
    </div>
  );
};
