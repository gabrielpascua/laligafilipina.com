const fs = require('fs/promises');
const path = require('path');
// const cheerio = require('cheerio');

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
    const lastIssueJson = issues.reverse().find((jsonFile) => {
        return (
            jsonFile.startsWith((new Date()).getFullYear().toString().substring(2)) &&
            jsonFile.endsWith('.json')
        );
    });
    const LAST_ISSUE_FILE = path.join(ISSUES_PATH, lastIssueJson);

    const lastIssue = JSON.parse(await fs.readFile(LAST_ISSUE_FILE));
    
    let { issue, hero, ticker, carousel } = lastIssue;

    // New Issue
    issue.number += 1;
    issue.date = new Date((new Date(issue.date)).getTime() + (7 * 24 * 60 * 60 * 1000))

    // Empty Hero
    // const $ = cheerio.load(hero.content);
    // $('a').attr('href', '#');
    // $('.hero-lead').text('TBD');
    // $('.hero-dek').text('TBD');
    // $('p > small').text('tbd.com')
    // hero.content = $('body').html();
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