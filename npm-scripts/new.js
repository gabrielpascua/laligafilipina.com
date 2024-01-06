const fs = require('fs/promises');
const path = require('path');

function resetKey(key, object) {
    const MIN_DATE = new Date('1970-01-01Z00:00:00:000');
    if (key === 'date') {
        object[key] = MIN_DATE;
    } else {
        object[key] = '';
    }
}

(async function(){
    const ISSUES_PATH = path.join(process.cwd(), 'site/data/issues');
    const issues = await fs.readdir(ISSUES_PATH);
    const lastIssueJson = issues.sort((a,b) => a-b).pop();
    const currentYear = new Date().getFullYear().toString().substring(2);
    const LAST_ISSUE_FILE = path.join(ISSUES_PATH, lastIssueJson);
    const lastIssue = JSON.parse(await fs.readFile(LAST_ISSUE_FILE));
    
    let { issue, hero, ticker, carousel } = lastIssue;
    const lastIssueYear = issue.number.toString().substring(0, 2);

    // New Issue
    issue.number = currentYear === lastIssueYear ? 
        (issue.number + 1) : parseInt(`${currentYear}001`);
    issue.date = new Date((new Date(issue.date)).getTime() + (7 * 24 * 60 * 60 * 1000))

    // Empty Hero
    Object.keys(hero).forEach(k => resetKey(k, hero));

    // Empty Tickers
    let { primary, secondary } = ticker;

    Object.keys(primary).forEach(k => resetKey(k, primary));
    secondary.forEach(sec => {
        Object.keys(sec).forEach(s => resetKey(s, sec));
    });

    // Empty Carousel
    carousel.forEach(car => {
        Object.keys(car).forEach(c => resetKey(c, car));
    });

    const newIssuePath = path.join(ISSUES_PATH, `${issue.number}.json`);
    await fs.writeFile(newIssuePath, JSON.stringify(
        {
            issue,
            hero,
            ticker,
            carousel
        },
        null,
        '    '
    ));
})();