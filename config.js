const { Sequelize } = require('sequelize');
require('dotenv').config();
const toBool = (x) => x === 'true';
const DATABASE_URL = process.env.DATABASE_URL || './bot.db';

module.exports = {
 LOGS: toBool(process.env.LOGS) || true,
 SESSION_ID: (process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVBRcE5IUkFRd0VxT0x4L1BCcThZVXZvdnN1MURMRjlqM2U3dTQ4YWpsZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibEVvYXh3MlVGNTUrZGlTUkpTOXgvOFhuSm9pelViRmRhWWFPME1meWxCOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZUCtDbEZGR1FNek83M1NwcnVqS21PSzVVSThoaFhRRWt2bW9maEZZdjFBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0YVpjWUtORkp3SzZPT1ltdEdCVk1PWWl2YlB1NmlkUTlTcm8rNDA1K3hRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1EUEhTdmNpV1Q2enVpM1FUazl0VmFTL3BuQ1dicm9VNVc0OVRicVcxbnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImU0UkNpbWM3THllRzQyYjRzL2RIVEd6dGc2aVpYdDBTR0wxeGJLazNYenM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUlFc3RTd2xaWGRTbm9UTE5NMWphd3pxbHJsQ1NkbGExTzZFck9kdWltbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRy9QVHozVCs0OFRIc3FOWnQxeE81Vmt0UzEvdGhkT2FzZlFxV3ArK0poUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVPeGVCUHA5c1Z5dEV6eUhsWHFBZ2NncmxlYlRYemhFeldzZHZSb3haSy9qVXMxeVJkRGljWXVMSXZzSUI2c25ieVlNUGRlQlg3UVdWMS9hVGRTU2lRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA3LCJhZHZTZWNyZXRLZXkiOiJhUFlsVklvWUdYTEN5V2tZZ1hFS2d3OVVVNzdXeWZIWXF5REhLcFZsSFlFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxMDA4MzU3NjdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRjEwMzQ4OTdGMzRGN0RFODc4NTMxOENFRjkyOEUyNzIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNzg1MTM3MH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODEwMDgzNTc2N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxQjNDOTRFOTcyODRDRjlGQjYxQUZCRjhGRkI2ODk1MiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI3ODUxMzcyfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJNZ3pmNW5uX1RkLUduSGpPcDh0T0ZnIiwicGhvbmVJZCI6IjEzOWE0OTk1LWRhMDMtNGUzZS1hOGU2LTc1OWJlNzY4ZjYwYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFRkNtZzUwR0xjNllLS3BsSExMdHYvamRRd0U9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQVFOOHNMK0czZnl1QVNBTVVwejJnN1IybEFBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Iks4TURLRFJFIiwibWUiOnsiaWQiOiIyMzQ4MTAwODM1NzY3OjVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiS2luZyBEYXZpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmora3BnQ0VOdlc4N2NHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibENXd3BIUENSYktib2xhak9Qc1dJcEpaQ2orL1QyaUJYU3hLSW8vUTN3TT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTHdOajVjM3NBdjFCMUZML2tnSGthWEdSKy8xNzRkaTZNZS9mSksrQ295ekdEYTNXTS9zWTBrOURJNC9aSlFPNncweERrR1hmOE5jZ2dSZjB4eFdLQmc9PSIsImRldmljZVNpZ25hdHVyZSI6IlZpK3BiQjRhaVNmMVFSYVUvZWJ6T2NQUkpjSVlKdy84Y1doVzlyK1JHd2R6NDF6ZEFjbEpkaUZITkJMblFuSkpoTERESGltcFYwVy9CRTRCUHZYSGl3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODEwMDgzNTc2Nzo1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpRbHNLUnp3a1d5bTZKV296ajdGaUtTV1FvL3YwOW9nVjBzU2lLUDBOOEQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjc4NTEzNjgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTnNsIn0=').trim(),
 SUDO: process.env.SUDO || '2349123721026',
 HANDLERS: process.env.HANDLER === 'false' || process.env.HANDLER === 'null' ? '^' : '[.]',
 RMBG_KEY: process.env.RMBG_KEY || '',
 BRANCH: 'master',
 WARN_COUNT: 3,
 AUTHOR: process.env.AUTHOR || 'AstroX10',
 PACKNAME: process.env.PACKNAME || 'fxoprisa-md',
 WELCOME_MSG: process.env.WELCOME_MSG || 'Hi @user Welcome to @gname',
 GOODBYE_MSG: process.env.GOODBYE_MSG || '@user It was Nice Seeing you',
 AUTO_READ: toBool(process.env.AUTO_READ) || false,
 AUTO_STATUS_READ: toBool(process.env.AUTO_STATUS_READ) || false,
 DELETED_LOG: toBool(process.env.DELETED_LOG) || false,
 DELETED_LOG_CHAT: process.env.DELETED_LOG_CHAT || false,
 TIME_ZONE: process.env.TZ || 'Africa/Lagos',
 WORK_TYPE: process.env.WORK_TYPE || 'private',
 DATABASE_URL: DATABASE_URL,
 DATABASE:
  DATABASE_URL === './bot.db'
   ? new Sequelize({
      dialect: 'sqlite',
      storage: DATABASE_URL,
      logging: false,
     })
   : new Sequelize(DATABASE_URL, {
      dialect: 'postgres',
      ssl: true,
      protocol: 'postgres',
      dialectOptions: {
       native: true,
       ssl: { require: true, rejectUnauthorized: false },
      },
      logging: false,
     }),
};
