const ExcelJs = require("exceljs");
const { test, expect } = require("@playwright/test");

async function writeExcel(searchText, replaceText, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");
  const coord = await readExcel(worksheet, searchText);

  const cell1 = worksheet.getCell(coord.row, coord.column);
  cell1.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
  let coord = { row: 0, column: 0 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        coord.row = rowNumber;
        coord.column = colNumber;
      }
    });
  });
  return coord;
}


test("Upload Download Excel Test", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", {name: "Download"}).click();
    const download = await downloadPromise;
    await download.saveAs('/Users/rjain7/Downloads/' + download.suggestedFilename());
    writeExcel("Banana","Avocado","/Users/rjain7/Downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("/Users/rjain7/Downloads/download.xlsx");
    await expect(page.getByText('Avocado')).toBeVisible();
})