/* eslint-disable no-magic-numbers */
export const PORT = process.env.PORT || 4000;
export const JWT_SECRET = process.env.JWT_SECRET || 'LOLIDK';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'LOLIDK2';
export const AWS_REGION = process.env.AWS_REGION || 'eu-west-2';
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'inst-graphql-api';
export const AWS_USER_KEY = process.env.AWS_USER_KEY || 'AKIAUGSVZHSW2NPFJ3VS';
export const AWS_USER_SECRET_KEY = process.env.AWS_USER_SECRET_KEY || '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';
export const SIGN_URL_EXPIRES = process.env.SIGN_URL_EXPIRES || '3600';
export const WEB_SOCKET_SERVER_PORT = process.env.WEB_SOCKET_SERVER_PORT || 4001;
export const DEFAULT_IMAGE = 'https://aws-sign-url.s3.eu-west-2.amazonaws.com/SadCalendar.svg';
export const BASE_URL = 'https://stage.accelerator.geryon.space';
export const SERVER_TYPE = process.env.SERVER_TYPE || 'dev';

// AWS_BUCKET=dfa-image-bucket 
// AWS_ACCESS_KEY=AKIAUGSVZHSW2NPFJ3VS 
// AWS_SECRET_KEY=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 
// AWS_REGION=eu-west-2