// src/mock/transactions.ts

export interface Transaction {
  date: string
  narration: string
  refNo: string
  withdrawalAmt: number | null
  depositAmt: number | null
  closingBalance: number
}

export const transactionsData: { [key: string]: Transaction[] } = {
  '03271000009991': [
    { date: '2025-05-19', narration: 'CHQ DEP - MICR CLG - NOIDA WBO', refNo: '000000094622', withdrawalAmt: null, depositAmt: 6750000.00, closingBalance: 16511959.6 },
    { date: '2025-05-19', narration: 'CHQ DEP - MICR CLG - NOIDA WBO', refNo: '000000094621', withdrawalAmt: null, depositAmt: 6750000.00, closingBalance: 9761959.62 },
    { date: '2025-05-16', narration: 'NEFT Dr-SBIN0031770-Monika Maan-NETBANK, MUM-HDFCN52025051639405635-REG', refNo: 'HDFCN52025051639405635', withdrawalAmt: 430000.00, depositAmt: null, closingBalance: 3011959.62 },
    { date: '2025-05-16', narration: 'NEFT Dr-SBIN0031770-Monika Maan-NETBANK, MUM-HDFCN52025051639405635-REG', refNo: 'HDFCN52025051639405635', withdrawalAmt: 250000.00, depositAmt: null, closingBalance: 3441959.62 },
    { date: '2025-05-16', narration: 'NEFT Dr-SBIN0031770-Monika Maan-NETBANK, MUM-HDFCN52025051639405635-REG', refNo: 'HDFCN52025051639405635', withdrawalAmt: 250000.00, depositAmt: null, closingBalance: 3691959.62 },
    { date: '2025-05-16', narration: 'IMPS-510012128567-Arun Mann-SBIN-xxxxxxx2216-P', refNo: '513614120568', withdrawalAmt: 70000.00, depositAmt: null, closingBalance: 3941959.62 },
    { date: '2025-05-15', narration: 'UPI-BHANSINGH-q957829181@ybl-YESB0YBLUPI-104843231963-UPI', refNo: '104843231963 ', withdrawalAmt: 200.00, depositAmt: null, closingBalance: 4011759.62 },
    { date: '2025-05-14', narration: 'IMPS-512811844915-SUNIT GUPTA-ICIC-xxxxxxxx5966-IMPS Transaction', refNo: '513416706268 ', withdrawalAmt: null, depositAmt: 50000.00, closingBalance: 4011959.62 },
    { date: '2025-05-14', narration: 'NEFT-Cr-SIP REDEEM DIVYANSH TANEJA-ICIC-xxxxxx6445', refNo: '023174791542 ', withdrawalAmt: null, depositAmt: 60000.00, closingBalance: 3961959.62 },
    { date: '2025-05-13', narration: 'IMPS-513317896419-Mrs SPRIHA NUPUR-SBIN-xxxxxxxxxxxxx8641-ReqPay', refNo: '513317893505 ', withdrawalAmt: null, depositAmt: 350000.00, closingBalance: 3901959.62 },
    { date: '2025-05-13', narration: 'IMPS-513317896419-Mrs SPRIHA NUPUR-SBIN-xxxxxxxxxxxxx8641-ReqPay', refNo: '513317893505 ', withdrawalAmt: null, depositAmt: 500000.00, closingBalance: 3551959.62 },
    { date: '2025-05-11', narration: 'IMPS-512811844915-SUNIT GUPTA-ICIC-xxxxxxxx5966-IMPS Transaction', refNo: '513110483481 ', withdrawalAmt: null, depositAmt: 60000.00, closingBalance: 3051959.62 },
    { date: '2025-05-09', narration: 'IMPS-512811844915-SUNIT GUPTA-ICIC-xxxxxxxx5966-IMPS Transaction', refNo: '512910965615 ', withdrawalAmt: null, depositAmt: 49000.00, closingBalance: 2991959.62 },
    { date: '2025-05-08', narration: 'IMPS-512811844915-SUNIT GUPTA-ICIC-xxxxxxxx5966-IMPS Transaction', refNo: '512811844915 ', withdrawalAmt: null, depositAmt: 1000.00, closingBalance: 2942959.62 },
    { date: '2025-05-07', narration: 'EMI 454727061 Chq S4547270610311 0425454727061', refNo: '000000000000000', withdrawalAmt: 35294.00, depositAmt: null, closingBalance: 2941959.62 },
    { date: '2025-05-07', narration: 'EMI 461561532 Chq S4615615320151 0425461561532', refNo: '0000423625612847', withdrawalAmt: 40332.00, depositAmt: null, closingBalance: 2977253.62 },
    { date: '2025-05-03', narration: 'UPI-MobikwikMerchant-ombk.aadc4813318ewevlrxf7@mbk-PPIW0881822-104193301756-UPI', refNo: '104193301756', withdrawalAmt: 590.00, depositAmt: null, closingBalance: 3017585.62 },
    { date: '2025-05-03', narration: 'UPI-INDRESH KUMAR-bharatpe.9j0e0v7h2u641174@fbpe-FDRL0001382-104192973704-Pay to BharatPe Me', refNo: '104192973704', withdrawalAmt: 350.00, depositAmt: null, closingBalance: 3018175.62 },
    { date: '2025-05-03', narration: 'UPI-SANJAY MEDICOS-q387677561@ybl-SBIN0009111-104180689735-UPI', refNo: '104180689735', withdrawalAmt: 45.00, depositAmt: null, closingBalance: 3018525.62 },
    { date: '2025-05-02', narration: 'UPI-SATISH KUMAR SO OM P-satishsharma7027@okicici-PUNB0024510-548886306617-UPI', refNo: '548886306617', withdrawalAmt: null, depositAmt: 4000.00, closingBalance: 3018570.62 },
    { date: '2025-04-27', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000320141224', withdrawalAmt: null, depositAmt: 90000.00, closingBalance: 3014570.62 },
    { date: '2025-04-27', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000320452342', withdrawalAmt: null, depositAmt: 70000.00, closingBalance: 2924570.62 },
    { date: '2025-04-27', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000320870215', withdrawalAmt: null, depositAmt: 100000.00, closingBalance: 2854570.62 },
    { date: '2025-04-25', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000320870212', withdrawalAmt: null, depositAmt: 1000000.00, closingBalance: 2754570.62 },
    { date: '2025-04-24', narration: 'NEFT Cr-KKBK0000958-ASS CREATIONS PVT LTD-SANJAY TANEJA-KKBKN62025042445439328', refNo: 'KKBKN62025042445439328 ', withdrawalAmt: null, depositAmt: 74966.00, closingBalance: 1754570.62 },
    { date: '2025-04-16', narration: 'IMPS-508115137565-PPF-55000000191609-HDFC-SANJAY TANEJA', refNo: '000000000000000', withdrawalAmt: null, depositAmt: 150000.00, closingBalance: 1679604.62 },
    { date: '2025-04-11', narration: 'IMPS-510102577485-DIVYANSH TANEJA-ICIC-xxxxxxxx6445-IMPS Transaction', refNo: '510102327385', withdrawalAmt: null, depositAmt: 75000.00, closingBalance: 1529604.62 },
    { date: '2025-04-19', narration: 'IMPS-510012128567-Arun Mann-SBIN-xxxxxxx2216-P', refNo: '510012128567', withdrawalAmt: 500000.00, depositAmt: null, closingBalance: 1454604.62 },
    { date: '2025-04-07', narration: 'IMPS-509713502979-Mrs SPRIHA NUPUR-SBIN-xxxxxxxxxxxxx8641-ReqPay', refNo: '509713502979', withdrawalAmt: null, depositAmt: 499500.00, closingBalance: 1954604.62 },
    { date: '2025-04-07', narration: 'EMI 454727061 Chq S4547270610311 0425454727061', refNo: '000000000000000', withdrawalAmt: 35294.00, depositAmt: null, closingBalance: 1455104.62 },
    { date: '2025-04-07', narration: 'IMPS-509713502979-Mrs SPRIHA NUPUR-SBIN-xxxxxxxxxxxxx8641-ReqPay', refNo: '509713502979', withdrawalAmt: null, depositAmt: 500.00, closingBalance: 1490398.62 },
    { date: '2025-04-07', narration: 'EMI 461561532 Chq S4615615320151 0425461561532', refNo: '0000423625612847', withdrawalAmt: 40332.00, depositAmt: null, closingBalance: 1489898.62 },
    { date: '2025-04-05', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000127392971', withdrawalAmt: null, depositAmt: 250000.00, closingBalance: 1530230.62 },
    { date: '2025-04-05', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000320870212', withdrawalAmt: null, depositAmt: 300000.00, closingBalance: 1280230.62 },
    { date: '2025-04-04', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000389929580', withdrawalAmt: 1000000.00, depositAmt: null, closingBalance: 980230.62 },
    { date: '2025-04-04', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000389929580', withdrawalAmt: 1000000.00, depositAmt: null, closingBalance: 1080230.62 },
    { date: '2025-04-04', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000389929580', withdrawalAmt: 1000000.00, depositAmt: null, closingBalance: 1180230.62 },
    { date: '2025-04-01', narration: 'Interest paid till 31-MAR-2025', refNo: 'AXOBR21479128454', withdrawalAmt: null, depositAmt: 5044.00, closingBalance: 1280230.62 },
    
  ],
  '03271000041278': [
    { date: '2025-05-19', narration: 'CHQ DEP - MICR CTS - ICIC PASCHIMV', refNo: '000008957428', withdrawalAmt: null, depositAmt: 607000.00, closingBalance: 2546064.57 },
    { date: '2025-04-27', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000320141224', withdrawalAmt: null, depositAmt: 50000.00, closingBalance: 1939064.57 },
    { date: '2025-04-27', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000320141224', withdrawalAmt: null, depositAmt: 90000.00, closingBalance: 1889064.57 },
    { date: '2025-04-27', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000320141224', withdrawalAmt: null, depositAmt: 100000.00, closingBalance: 1799064.57 },
    { date: '2025-04-25', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000320870221', withdrawalAmt: null, depositAmt: 500000.00, closingBalance: 1699064.57 },
    { date: '2025-04-16', narration: 'RTGS Cr-IOBA0002259-I J MANOCHA,RAVINDER MANOCHA-JAYA TANEJA-IOBAR52025041600313124', refNo: '0000426018195789', withdrawalAmt: null, depositAmt: 460000.00, closingBalance: 1199064.57 },
    { date: '2025-04-06', narration: '50200034218363-TPT-P-JV INDUSTRIES', refNo: '000189699159', withdrawalAmt: null, depositAmt: 50000.00, closingBalance: 7399064.57 },
    { date: '2025-04-04', narration: '50200034218363-TPT-P-JV INDUSTRIES', refNo: '000189699159', withdrawalAmt: 100000.00, depositAmt: null, closingBalance: 689064.57 },
    { date: '2025-04-04', narration: '50200034218363-TPT-P-JV INDUSTRIES', refNo: '000189699159', withdrawalAmt: 100000.00, depositAmt: null, closingBalance: 789064.57 },
    { date: '2025-04-04', narration: '50200034218363-TPT-P-JV INDUSTRIES', refNo: '000189699159', withdrawalAmt: 100000.00, depositAmt: null, closingBalance: 889064.57 },
    { date: '2025-04-02', narration: 'LOCKER RENT- BRN 4362-SMALL-B11-307 50500006535549', refNo: '0000000000000', withdrawalAmt: 5000.00, depositAmt: null, closingBalance: 989064.57 },
    { date: '2025-04-02', narration: 'SGST-Small Lockers SC-NCB2609278716166', refNo: 'NCB2609278716166', withdrawalAmt: 450.00, depositAmt: null, closingBalance: 994064.57 },
    { date: '2025-04-02', narration: 'CGST-Small Lockers SC-NCB2609278716166', refNo: 'NCB2609278716166', withdrawalAmt: 450.00, depositAmt: null, closingBalance: 994514.57 },
    { date: '2025-04-02', narration: 'RTGS Cr-IOBA0002259-I J MANOCHA,RAVINDER MANOCHA-JAYA TANEJA-IOBAR52025040200354065', refNo: 'IOBAR52025040200354065', withdrawalAmt: null, depositAmt: 500000, closingBalance: 994964.57 },
    { date: '2025-04-01', narration: 'Interest paid till 31-MAR-2025', refNo: '000000000000000', withdrawalAmt: null, depositAmt: 1558, closingBalance: 494964.57 },
    { date: '2025-03-22', narration: 'IMPS-508115137408-PPF-55000000191651-HDFC-JAYA TANEJA', refNo: '0000000000000', withdrawalAmt: 150000.00, depositAmt: null, closingBalance: 493406.81 },
    { date: '2025-03-21', narration: 'IB FUNDS TRANSFER CR-03271000009991-SANJAY TANEJA', refNo: '000000000000000', withdrawalAmt: null, depositAmt: 100000.00, closingBalance: 643406.81 },
    { date: '2025-03-19', narration: '50100436924130-TPT-P-DIVYANSH TANEJA', refNo: '0000000594634754', withdrawalAmt: null, depositAmt: 50000.00, closingBalance: 543406.81 },
    { date: '2025-03-19', narration: '50100436924130-TPT-JAYA TANEJA-DIVYANSH TANEJA', refNo: '000356340803', withdrawalAmt: 150000.00, depositAmt: null, closingBalance: 493406.81 },
    { date: '2025-03-18', narration: 'RTGS Cr-IOBA0002259-I J MANOCHA,RAVINDER MANOCHA-JAYA TANEJA-IOBAR52025031800202279', refNo: 'IOBAR52025031800202279', withdrawalAmt: null, depositAmt: 500000.00, closingBalance: 643406.81 },
    { date: '2025-01-25', narration: 'IB BILLPAY DR-HDFCZF-552365XXXXXX6971', refNo: 'IB25155851958076', withdrawalAmt: null, depositAmt: 30732.00, closingBalance: 143406.81 },
    { date: '2025-01-06', narration: 'IB FUNDS TRANSFER DR-03271000009991 -SANJAY TANEJA', refNo: 'IB06000044554552', withdrawalAmt: 100000.00, depositAmt: null, closingBalance: 174138.81 },
    { date: '2025-01-03', narration: 'IB BILLPAY DR-HDFCZF-552365XXXXXX6971', refNo: 'IB03123041452420', withdrawalAmt: 228213.00, depositAmt: null, closingBalance: 274138.81 },
    { date: '2025-01-03', narration: 'FT - Cr - 03921000016208 - NARENDER KUMAR', refNo: '03921000016208', withdrawalAmt: null, depositAmt: 450000.00, closingBalance: 502351.57 },
    { date: '2025-01-02', narration: '03921000016208-TPT-Ok-NARENDER KUMAR', refNo: '03921000016208', withdrawalAmt: null, depositAmt: 50000.00, closingBalance: 52351.57 },
  ]
}
