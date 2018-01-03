import React, { PureComponent } from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { Colors } from '../helpers/Colors';

export default class Logo extends React.PureComponent {
  render(props) {
    return (
      <Svg
        style={{ height: (this.props.size*0.75), marginTop: (this.props.size*0.15), width: (this.props.size*0.65) }}
        viewBox={'0 0 1558 2000'}
      >
        <Defs>
          <LinearGradient id='love' x1='0%' y1='0%' x2='0%' y2='100%'>
              <Stop offset='70%' stopColor='#fff' stopOpacity='1' />
              <Stop offset='100%' stopColor={Colors['tertiary']} stopOpacity='1' />
          </LinearGradient>
        </Defs>
        <Path
          d='M1462 1931.8a74.4 74.4 0 0 1-43.2-38.7c-3.5-7.7-5-19.9-3.6-29.6a57.5 57.5 0 0 1 19-34.2c14.4-14.3 25.4-19.3 42.5-19.1 17.8.1 26.8 4.3 42.1 19.6 12.4 12.4 17 20.5 18.6 33.4 2.7 20.1-4 37.3-20.4 52.8a66.3 66.3 0 0 1-29.5 16.2c-7 1.5-19.5 1.3-25.6-.4zM29.2 571.3V3.3h98.8c96 0 99 0 110.7 2.1a956.7 956.7 0 0 1 41.5 7.9c3.6.6 8.3 1.7 10.5 2.2l10.1 2.2c3.4.7 6.7 1.7 7.3 2a37 37 0 0 0 6.4 2.1c2.9.7 6.8 1.9 8.7 2.6 11.9 4.3 16.6 6.2 17.5 7A169.4 169.4 0 0 1 372.4 47c1.6.9 8.7 5.8 17 11.8a224.8 224.8 0 0 1 36.8 37.1c4 5.7 13.4 19.8 14.8 22 1.7 2.9 9.8 19.2 12.3 25 5.2 11.8 6.4 15 8.5 22.5a302.6 302.6 0 0 1 12.9 53.9c.8 3 1.7 9.2 2 13.6l2.2 19.5c1.7 13.5 2 92 .4 103.5l-2 15.5c-1 9.2-3 19.3-6 30.7-1.1 4-2 7.8-2 8.5 0 .7-.6 2.5-1.4 4a29 29 0 0 0-2.1 6c-.4 1.8-1.4 4.2-2.1 5.3a232.2 232.2 0 0 1-44 71.2 670.5 670.5 0 0 1-22.6 23.7 230.8 230.8 0 0 0-17.8 19c0 .6 3.8 3.5 8.4 6.5 8.3 5.3 10 6.7 20.6 16.5 9 8.3 25.4 28 28.3 33.6a439.3 439.3 0 0 1 28.7 56.3c0 .7.7 2.6 1.6 4.2 1 1.7 2 4.4 2.5 6 .4 1.7 2 6.2 3.4 10 2.9 7.6 4.8 13.4 6.6 20.5l3 11a47 47 0 0 1 2 9c0 1.5.5 4.9 1.3 7.6.8 2.7 1.7 8.3 2.1 12.4.4 4.1 1.1 9.3 1.6 11.5 1.3 5.6 3.9 52.9 3.9 71.5 0 16.8-2.5 67.4-3.4 68.9-.3.4-1.2 6.4-2 13.2-.8 6.8-2 13.7-2.5 15.2a241.4 241.4 0 0 1-10 42.8 58 58 0 0 0-2.1 8c0 .8-1 3.2-2 5.4s-2 4.8-2 5.8-.9 3.4-2 5.4-2 4.3-2 5c0 .6-.6 2.4-1.4 4a424.8 424.8 0 0 0-6.7 14.3c-.5.8-1.3 2.6-1.9 4-.5 1.4-1.4 3.2-2 4l-4 7.5a228.7 228.7 0 0 1-35.6 48 237.1 237.1 0 0 1-36.4 29.5 200 200 0 0 1-23.5 12.9c-5 2.3-10.2 4.9-11.6 5.7-1.5.8-3.3 1.4-4 1.4-.8 0-3.2 1-5.4 2s-5 2-6 2c-1.2 0-3 .7-4 1.5s-2.8 1.5-3.7 1.5c-1 0-4.4.8-7.5 1.9-5.9 1.9-12.3 3.4-22.3 5.2l-13 2.4c-4.1.8-13 2-20 2.5-6.7.5-12.8 1.4-13.4 2-.6.7-35.6 1-107.3 1H29.3v-568zm197 400.5c24-3.1 40.6-10.8 54.8-25.5a113.5 113.5 0 0 0 17.7-26c4.8-9 10.4-25.3 13-38 6.7-32.7 7.8-46 7.2-91.5-.3-27.9-.8-39.3-2-46.5l-2.6-15.5a199.8 199.8 0 0 0-11.7-43c-2.6-6-7.4-16-8.7-18a142.3 142.3 0 0 0-16-19.5l-5.7-5c-4.1-3.8-21-13-23.8-13a125 125 0 0 0-30-5c-15.6-1.2-17.3-1.2-19.6.4l-2.6 1.7V798c0 153 .2 171 1.6 173 1.3 2 2.4 2.2 9.3 2.2 4.2 0 12.8-.7 19.2-1.5zm5-502.4a76.7 76.7 0 0 0 16.7-4.1c1 0 3.6-1 5.8-2s4.5-2 5-2c.6 0 3.4-1.6 6.4-3.5s5.5-3.5 5.8-3.5a96 96 0 0 0 32.2-39c1-1.6 4.1-9.4 6-15 2.3-6.2 4.1-14.4 7.8-33.5 2-10.8 3-65.8 1.5-79.5a220.7 220.7 0 0 0-10.2-48.6c0-1.5-.7-3.4-6.4-15.3a98.3 98.3 0 0 0-30.2-35.6 92 92 0 0 0-26.2-12.5c-1 0-3.5-.6-5.3-1.4-3.4-1.4-29-4.6-36.6-4.6-8 0-7.3-13.4-7 152.9.2 130.4.4 148.3 1.7 149.2 2 1.4 19.7.3 33-2zm282.7 667c-.3-1.6 0-5.5.8-8.7.7-3.3 1.9-10.4 2.5-15.8.6-5.4 1.3-10.3 1.6-10.7.2-.4.9-4.6 1.4-9.1.6-4.6 1.7-12.2 2.5-16.8a644.9 644.9 0 0 0 4.5-30.3c.6-4 1.5-9.7 2.1-12.7.6-3 1.7-10.3 2.4-16 1.6-11.9 3-20.6 5-33 1-4.7 2-12.5 2.6-17.4.5-5 1.2-9.3 1.5-9.7.2-.5.9-4.6 1.4-9.1.6-4.6 1.7-12.2 2.5-16.8 1.4-8 1.9-11.5 4.6-30.5.5-3.9 1.6-10.9 2.4-15.5.8-4.7 1.7-10.8 2-13.5.3-2.8 1.2-8.9 2-13.5.8-4.7 2-11.8 2.5-15.8 2.7-18.9 3.2-22.1 4.2-27.7a374 374 0 0 0 2.4-15.5c1.5-11.5 3-21.9 5-32.5.7-4.4 1.8-12.3 2.4-17.4.6-5.2 1.3-9.8 1.6-10.2.2-.4.9-4.6 1.4-9.1.6-4.6 1.7-12.2 2.5-16.8 1.5-8.7 2.8-17.6 4.6-31l2.4-14.5c.8-3.9 1.7-10 2-13.5.3-3.6 1.2-10 2-14 1.3-7.2 2.6-15.4 4.6-30.5.5-3.9 1.4-9.5 2-12.5.6-3 1.7-10 2.4-15.5s1.8-12.7 2.4-16c1.1-6.4 2.6-16.3 4.2-28.5.6-4.2 1.6-11.1 2.4-15.5.8-4.4 1.7-10.3 2-13 .3-2.8 1.2-8.9 2-13.5 1.5-8.8 2.8-17.8 4.6-31l2.4-14.5c.8-3.9 1.6-10 2-13.5a153 153 0 0 1 2-13.5c.8-3.9 1.9-10.6 2.5-15l2-15.5 2.5-15.5c.8-4.4 1.7-10.3 2-13 .3-2.8 1.2-8.9 2-13.5.8-4.7 2-11.8 2.5-15.8l2-14.5 2.5-15.7c.8-4.7 1.7-10.8 2-13.5.3-2.8 1.2-8.9 2-13.5 1.5-8.6 2.6-16.2 4.5-30 .6-4.2 1.5-10 2.1-13 .6-3 1.7-10 2.4-15.5s1.8-12.7 2.4-16c1.1-6.4 2.6-16.3 4.2-28.5.6-4.2 1.6-11.1 2.4-15.5.8-4.4 1.7-10.3 2-13 .3-2.8 1.2-8.9 2-13.5 1.5-8.8 2.8-17.8 4.6-31l2.4-14.5c.8-3.9 1.7-10.4 2-14.5s1.2-8.8 1.7-10.5c.4-1.6 1.3-7.2 1.8-12.5.6-5.2 1.5-10.8 2-12.5a101 101 0 0 0 2-12.6c.5-5.2 1.7-11.9 2.6-14.7l1.7-5.2H889l1.1 5.1c.7 2.8 1.2 6.8 1.2 8.8 0 2 .7 6.3 1.4 9.6.8 3.3 1.7 9.2 2.1 13 .4 3.9 1.1 8.7 1.6 10.8.6 2.1 1.4 7.5 2 12 .4 4.5 1.5 12 2.3 16.7 2.2 12.5 3.6 21.2 5.1 33 .8 5.8 1.8 13 2.4 16a24979.6 24979.6 0 0 1 6.6 43c.8 4.7 1.7 10.8 2 13.5a338 338 0 0 0 2 13.5 775.4 775.4 0 0 1 4.5 30.3l2.5 15.2c.8 4.4 1.7 10.5 2 13.5.3 3 1.2 9.1 2 13.5l2.5 15.5c2.2 15.9 3.1 21.8 4.5 30 .8 4.7 1.7 10.8 2 13.5a317 317 0 0 0 2 13.5c1.3 8 2 12.6 4.5 30.3l2.5 15.7c.8 4.7 1.7 10.8 2 13.5.3 2.8 1.2 8.6 2 13s1.9 11.4 2.4 15.5l2.1 15.5c.6 4.4 1.7 11.2 2.5 15 .8 3.9 1.7 10 2 13.5.3 3.6 1.2 9.7 2 13.5.8 3.9 1.9 10.6 2.5 15 1.5 11.8 2.9 21 4.5 30.5.8 4.7 1.7 10.8 2 13.5a338 338 0 0 0 2 13.5c.8 4.7 2 11.8 2.5 15.8l2 14.5 2.5 15.7c.8 4.7 1.7 10.8 2 13.5.3 2.8 1.2 8.6 2 13a472 472 0 0 1 2.4 15 623 623 0 0 0 4.6 30.5c.8 4.2 1.7 10.5 2 14s1.3 9.7 2 13.5c.8 3.9 1.8 10.4 2.4 14.5a866 866 0 0 0 4.6 31c.8 4.7 1.7 10.8 2 13.5.3 2.8 1.2 8.9 2 13.5l2.4 15.5c2.2 15.2 3.2 22.3 4.2 27.5l2.4 16.8c.8 6.2 1.6 11.7 2 12.1.2.5.9 4.9 1.4 9.8a339 339 0 0 0 2.5 17.3 694 694 0 0 1 5.1 33c.8 5.8 1.8 13 2.4 16a25153.5 25153.5 0 0 1 4.1 27.3l2.5 15.7c.8 4.7 2 12.3 2.5 16.9.5 4.5 1.2 8.6 1.5 9 .2.5 1 5.1 1.5 10.3a276 276 0 0 0 2.5 16.8c1.4 7.8 2.7 16.5 5 33 .6 5.3 1.7 12.2 2.3 15.5l2.2 13.5c2 14 3 21.5 4.5 30 2.4 13.9 2.7 17.7 2 21l-.7 3h-79.9c-44 0-79.9-.2-79.9-.4l-1.9-10.7c-1-5.7-2.2-13.5-2.5-17.3-.4-3.9-1.3-10.8-2-15.5s-2-12.3-2.5-17a840.5 840.5 0 0 0-4.6-34.5c-.8-5-1.7-12-2-15.5a253 253 0 0 0-2-15 505.2 505.2 0 0 1-4.5-34.5c-.6-5-1.7-12.8-2.5-17.5-.8-4.7-1.7-11.9-2-16-.4-4.1-1-9.2-1.6-11.2-.5-2-1.3-8.2-1.9-13.9a44 44 0 0 0-2-11.5c-1-1.2-14.7-1.5-80-1.5-74.1 0-79 .2-79.8 1.8-1.2 2.1-2.7 12.6-6.2 41.2l-2.5 17.5c-.8 5-1.7 12-2 15.5a237 237 0 0 1-2 15c-.8 4.7-1.9 12.5-2.4 17.3a691.9 691.9 0 0 1-4.6 34.7c-.8 4.7-1.7 12-2 16-.4 4.2-1 9.2-1.6 11.2-.5 2-1.4 8.6-2 14.5s-1.4 12.4-1.9 14.3c-.5 2-1.4 8.6-2 14.8a63.9 63.9 0 0 1-2.7 14.8l-1.6 3.4H514.6l-.6-2.8zm328.1-406.3c1.6-1.6 1.5-9.3-.2-18-.8-4-1.7-10.4-2-14.3l-2-15.5a491 491 0 0 1-2.5-17l-2.1-17.5c-.6-5-1.7-12.8-2.5-17.5-.8-4.7-1.7-11.4-2-15-.3-3.6-1.2-10.3-2-15a505.2 505.2 0 0 1-4.5-34.5c-.6-5-1.7-12.8-2.5-17.5-.8-4.7-1.7-11.4-2-15-.3-3.6-1.2-10.3-2-15-1.3-8-2.1-14.5-4.5-34.7-.6-4.9-1.7-12.6-2.5-17.3a237 237 0 0 1-2-15c-.3-3.6-1.2-10.5-2-15.5-1.4-9.1-2.8-19-4.6-34.5a554 554 0 0 0-2.4-17.5c-.8-5-1.7-11.5-2-14.5-.3-3-1.2-8.4-2-12-.8-3.6-1.6-7.8-1.7-9.5-.3-2.7-.7-3-4.2-3.3-5-.4-6.6 1.4-6.6 7.8 0 2.5-.5 6.5-1 9s-1.5 8.1-2 12.5l-2.5 17c-.8 5-1.6 11.7-2 15-.3 3.3-1.2 10-2 15-1.4 9-2.7 19-4.5 34.5l-2.5 17.5c-.8 5-1.6 11.7-2 15-.3 3.3-1.2 10-2 15-1.3 8.4-2.1 14.8-4.6 35-.5 4.4-1.6 12-2.4 17-.8 5-1.6 11.7-2 15-.3 3.3-1.2 10-2 15-1.3 8.4-2.1 14.8-4.6 35-.5 4.4-1.6 12-2.4 17-.8 5-1.7 11.7-2 15-.3 3.3-1.2 10-2 15s-1.9 12.8-2.4 17.5c-2 16.8-3.2 25.7-4.7 34.8-1 5.7-1.3 9.7-.7 10.3.5.5 24 1 54.9 1.2 29.6.1 54.2.3 54.5.5.3.1 1-.3 1.7-1zm276.8 407c-.3-1.3-.6-42.3-.6-91.1 0-84 .1-89 1.9-93.5 2.5-6.3 4-10.8 5.6-16.2 1.6-5.3 3-9.7 5.6-16.5 1-2.8 2-5.7 2-6.5 0-.8.6-2.7 1.4-4.3.8-1.5 1.7-4.4 2.1-6.5s1-4.1 1.4-4.7 2-5 3.5-10l4-12.5c2.1-5.6 4.6-13.2 5.6-17.4.6-2.2 1.4-4.5 2-5 .4-.7 1.3-3 1.8-5.1 1.4-5.4 4-13.3 5.7-17.3a18 18 0 0 0 1.4-5c0-1 1-3.5 2-5.7s2-4.8 2-5.8.6-3.3 1.4-5c1.7-4 4.4-12 5.7-17 .5-2.2 1.6-5.2 2.4-6.7.9-1.6 1.5-3.7 1.5-4.7s.7-3 1.4-4.5a27 27 0 0 0 2-6c.4-1.8 1.3-4.6 2-6.3.8-1.6 2.4-6.4 3.6-10.5 1.3-4.1 3.1-9.6 4.2-12.2 1-2.6 1.8-5.4 1.8-6.3s.6-2.6 1.4-3.8c.8-1.2 1.7-4 2-6.2.5-2.2 1.2-4.5 1.7-5 .4-.6 1.3-2.8 1.8-5 1.4-5.4 4-13.3 5.7-17.3.8-1.8 1.4-4 1.4-5s.7-3 1.6-4.6c.8-1.6 1.9-4.6 2.4-6.5 1-3.8 3.3-11.1 5.4-17 3-8.3 4.8-13.8 5.7-17.6.6-2.1 1.4-4.4 1.9-5 .4-.5 1.1-2.6 1.5-4.5s1.3-4.8 2-6.5c.7-1.6 2.3-6.4 3.5-10.5s2.9-8.8 3.6-10.5 1.7-4.6 2-6.5 1-4 1.4-4.5c.4-.5 2-5 3.5-10l4-12.5c2.1-5.6 4.6-13.2 5.6-17.5.6-2.1 1.4-4.4 2-5 .4-.6 1.3-2.9 1.8-5 1.4-5.4 4-13.3 5.7-17.3a18 18 0 0 0 1.4-5c0-1 1-3.5 2-5.7s2-4.8 2-5.8.6-3.3 1.4-5a182 182 0 0 0 6-17.7l2.5-7.5a582 582 0 0 0 11.6-35.7c.8-2.5 1.8-5.5 2.4-6.6.6-1 1.5-3.7 2-5.8a111 111 0 0 1 5.2-15.6c.5-1 1.3-3.4 1.8-5.5 1-4 3.3-11.2 5.5-17.3 2.3-6.2 4.7-13.4 5.6-16.5 1.2-3.9 3.8-12 5.4-16.5 3-8.2 4.8-13.7 5.7-17.5.6-2.1 1.4-4.4 1.9-5 .4-.5 1.1-2.6 1.5-4.5s1.3-4.8 2-6.5c.7-1.6 2.3-6.4 3.5-10.5l4-12.5c3.8-10.8 4.2-12.1 5.2-15.5.5-2 1.6-5 2.4-6.6.8-1.8 1.4-4 1.4-4.8 0-1 .7-3 1.5-4.5.8-1.6 1.9-4.6 2.4-6.7a111 111 0 0 1 5.2-15.6c.5-1 1.3-3.4 1.8-5.5 1-4 3.3-11.2 5.5-17.3 3-8 4.8-13.7 5.7-17.3.5-2 1.4-4.5 1.9-5.5a111 111 0 0 0 5.1-15.5c.5-2.2 1.6-5.2 2.4-6.7.9-1.6 1.5-4 1.5-5.2s.7-3.4 1.6-4.6a8.4 8.4 0 0 0 1.2-5l-.3-2.8-111-.5-111-.5-.2-82.7-.2-82.8h406v83.6c0 61.3-.3 84.1-1.2 85.7-.6 1.2-1.5 3.5-1.9 5.2-.7 2.7-5.2 16.1-8 24-.7 1.7-1.8 5-2.5 7.5-2.6 8.8-4.6 14.5-5.5 16.2-.5 1-1.3 3.5-1.9 5.5-1 4-3.3 11.2-5.5 17.3-3 8.2-4.7 13.8-5.6 17.5-.6 2.2-1.4 4.4-1.8 5-.5.6-1.3 2.8-1.9 5l-2.3 7.5c-4 11.5-4.8 14.2-7 21-1.2 4.2-2.8 8.9-3.5 10.5s-2.2 6.4-3.5 10.5l-4 12.5-2.9 8.5-2.3 7.5c-.6 2.2-1.4 4.5-1.8 5-.5.6-1.3 2.9-1.8 5-1 3.8-2.7 9.3-5.7 17.5-2.2 6.1-4.5 13.4-5.5 17.3-.5 2-1.4 4.6-1.9 5.5a111 111 0 0 0-5.1 15.6c-.5 2.1-1.6 5.1-2.5 6.7a13 13 0 0 0-1.4 4.5c0 .9-.7 3-1.4 4.8a182 182 0 0 0-6 17.6l-2.5 7.8-2.2 6.5-2.5 7.7a182 182 0 0 1-6 17.7c-.8 1.7-1.4 3.9-1.4 4.8 0 .9-.7 3-1.5 4.5s-1.9 4.6-2.4 6.7a111 111 0 0 1-5.2 15.5c-.5 1-1.3 3.5-1.8 5.5a203 203 0 0 1-5.7 17.3c-2.2 6.2-4.5 13.4-5.5 17.5-.6 2.2-1.4 4.4-1.8 5-.5.6-1.3 2.8-1.9 5a143.4 143.4 0 0 1-5.2 16l-4 12.5c-1.3 4.1-2.8 8.9-3.5 10.5s-2.3 6.4-3.5 10.5-3.1 9.8-4 12.5a247.4 247.4 0 0 0-5.2 15.5c-.5 2-1.6 5-2.4 6.7-.8 1.7-1.4 3.9-1.4 4.8 0 .9-.7 3-1.5 4.5s-1.9 4.6-2.4 6.7c-1.3 5-4 13-5.7 17-.8 1.7-1.4 3.9-1.4 4.8 0 1-.7 3.1-1.4 4.9-1.8 3.9-4.4 11.9-5.7 17-.5 2.1-1.6 5.1-2.5 6.7a13 13 0 0 0-1.4 4.5c0 .9-.7 3-1.4 4.8-1.8 3.9-4.2 11.4-9 27.1-2.1 7-4.7 14.4-6.1 18-.7 1.7-2.3 6.4-3.5 10.5s-3.1 9.8-4 12.5l-3 8.5-2.5 8a177.7 177.7 0 0 1-5.6 16.5l-2.9 8.5-2.5 8c-.7 2.6-1.8 5.6-2.4 6.8s-1.1 2.8-1.1 3.8c0 .9-.7 3-1.5 4.8-.8 1.7-1.8 4.7-2.4 6.6l-2.2 7a904 904 0 0 0-10.4 31l-5.5 17c-2.3 7.4-4.8 14.9-5.5 16.5-.7 1.7-1.6 4.6-2 6.5s-1.1 4-1.6 4.6a50 50 0 0 0-3.6 12.3c-.4 1.4 0 2.7.8 3.2s58.2.9 130.7 1c87.2 0 130 .3 131.2 1 2 1 2 3 2 80.3 0 61.3-.3 79.8-1.3 82l-1.2 2.6H1119.6l-.6-2.2z'
          stroke='none'
          strokeWidth='0'
          fill='#fff'
        />
        <Path
          d='M425 1993zm496-3c-8-1-19-14-35-39-41-62-55-109-66-211l-7-51c0-3-4-2-24 4-17 6-23 7-35 9-5 1-12 7-15 14-2 3-4 12-6 20-8 41-30 97-45 117-21 28-49 45-82 51-14 2-40 2-50 0-13-3-23-8-33-19a174 174 0 0 1-44-97c-1-12-2-17-4-17-3 0-12 15-31 52-30 59-46 84-67 104-17 16-34 26-51 31-7 2-11 2-25 2s-18-1-26-3c-15-4-28-11-43-26-16-15-29-33-37-51-11-21-13-30-16-66-3-27-5-39-8-44-1-3-2-3-5-2l-26 11-31 14c-37 14-75 18-97 10-7-2-8-4-8-10 0-7 5-10 21-12 31-2 50-6 73-15 25-10 40-19 55-35l11-10 1-35a645 645 0 0 1 95-333c29-49 55-81 79-98 9-7 27-16 38-20 17-6 37-7 48-3 13 4 27 26 34 48 2 11 2 34-1 52-5 27-19 81-30 112a610 610 0 0 1-148 240l-17 18 2 30c4 63 8 91 18 127 16 55 30 72 50 61 7-3 19-14 27-23 10-12 25-36 37-57l24-45a516 516 0 0 0 72-181c10-28 20-44 34-56 12-11 23-16 54-28 22-8 27-13 32-31 4-12 9-20 17-28 22-23 56-30 74-15 17 14 37 80 43 144a1043 1043 0 0 1 6 69l7 1c11 1 34-7 46-15 5-3 6-4 8-10l11-49c5-24 10-38 14-44 3-5 9-9 16-11 6-1 52 0 53 1l2 42c3 119 4 134 14 176 7 35 13 52 17 52 2 0 4-5 7-17l5-23c17-71 67-177 115-245 28-41 81-95 121-123 11-8 26-16 36-18 30-8 61-4 74 7 4 4 5 10 4 13l-2 3-25 1c-21 0-27 0-33 2-25 7-47 22-82 57-49 49-71 79-103 143a718 718 0 0 0-82 316c0 24-2 31-13 44-6 7-14 13-22 16-5 3-15 4-21 2zm-291-118c12-6 28-26 43-55 13-27 32-89 32-107 0-4-1-5-5-10l-11-9c-29-21-46-43-62-83-6-15-12-28-15-31-2-2-5-2-7 2a398 398 0 0 0-19 234c4 20 18 53 24 59 4 3 12 3 19 0zm81-220c2-4 1-45-2-65-5-47-16-90-25-103-3-5-7-5-10 0-13 17-15 47-5 86 8 32 24 70 34 80 4 5 7 6 8 2zm-436-13c10-8 29-32 45-55 49-74 90-172 103-249 8-46 6-71-6-71l-6 2c-18 9-54 67-82 131-33 77-61 178-64 228l1 14c3 3 5 3 9 0zm905 253a120 120 0 0 1-87-68c-8-17-9-17-9-63 0-45 0-44 9-67 9-22 24-52 37-70 22-31 55-62 77-74 17-8 28-10 55-10s29 1 38 9c11 11 15 22 14 41-1 10-1 14-4 23-5 13-11 25-20 39-22 34-38 48-61 54l-22 2c-20 2-25 3-31 10-10 11-17 41-16 66 3 37 15 65 32 71 9 3 27 3 41-1 33-8 45-16 93-65 29-29 40-36 45-31 2 2 2 4 2 12 0 9 0 9-5 20-15 31-56 68-95 87-21 11-42 15-70 16l-23-1zm42-210c10-5 29-24 39-40 11-18 19-42 18-54-1-6-4-13-7-15-5-6-14-1-29 15-19 18-34 39-44 60-8 17-11 27-10 33 1 3 5 4 17 4 9 0 10 0 16-3z'
          stroke='none'
          strokeWidth='0'
          fill='url(#love)'
        />
      </Svg>
    );
  }
}
