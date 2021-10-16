require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet')

;(async function () {
  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(
    '1rrYVxvKNLXrD-eiQLOD4hc0Clpp4xPAINc5d70VOv5c',
  )

  // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  })

  await doc.loadInfo() // loads document properties and worksheets
  // console.log(doc.title)

  //   await doc.updateProperties({ title: 'renamed doc' })

  const sheet = doc.sheetsByIndex[4] // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  // console.log(sheet.title)
  // console.log(sheet.rowCount)

  // read rows
  const rows = await sheet.getRows({ limit: 6, offset: 1 }) // can pass in { limit, offset }

  const cryptos = rows.map(r => r._rawData[0]).filter(c => c !== '')
  console.log(`gb🚀 ~ cryptos`, cryptos)

  //   // adding / removing sheets
  //   const newSheet = await doc.addSheet({ title: 'hot new sheet!' })
  //   await newSheet.delete()
})()

// https://www.npmjs.com/package/google-spreadsheet
// https://www.youtube.com/watch?v=UGN6EUi4Yio
// https://www.youtube.com/watch?v=PFJNJQCU_lo
