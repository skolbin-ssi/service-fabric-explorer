/// <reference types="cypress" />

export const apiUrl = (url) => {
    return `/${Cypress.env("API_PREFIX")}${url}`;
}

export const fixtureRefFormatter = (fixture_ref_name) => {
    return `@${fixture_ref_name}`;
}

const fixtureRequestFormatter = (fixture_reqest_ref_name) => {
    return `get${fixture_reqest_ref_name}`;
}

const exportFormat = (fixture_ref_name) => {
    return fixtureRefFormatter(fixtureRequestFormatter(fixture_ref_name));
}

export const FIXTURE_AAD ="aad";
export const FIXTURE_REF_AAD = exportFormat(FIXTURE_AAD);
export const aad_route = apiUrl('/$/GetAadMetadata/*');

export const FIXTURE_APPS ="apps";
export const FIXTURE_REF_APPS = exportFormat(FIXTURE_APPS);
export const apps_route = apiUrl('/Applications/?*');

export const FIXTURE_APPTYPES ="appTypess";
export const FIXTURE_REF_APPTYPES = exportFormat(FIXTURE_APPTYPES);
export const apptypes_route = apiUrl('/ApplicationTypes/?*');

export const FIXTURE_CLUSTERHEALTH ="clusterHealth";
export const FIXTURE_REF_CLUSTERHEALTH = exportFormat(FIXTURE_CLUSTERHEALTH);
export const clusterHealth_route = apiUrl('/$/GetClusterHealth?*');

export const FIXTURE_CLUSTERHEALTHCHUNK ="clusterHealthChunk";
export const FIXTURE_REF_CLUSTERHEALTHCHUNK = exportFormat(FIXTURE_CLUSTERHEALTHCHUNK);
export const clusterHealthChunk_route = apiUrl('/$/GetClusterHealthChunk?*');

export const FIXTURE_MANIFEST ="manifest";
export const FIXTURE_REF_MANIFEST = exportFormat(FIXTURE_MANIFEST);
export const manifest_route = apiUrl('/$/GetClusterManifest*');

export const FIXTURE_NODES ="nodes";
export const FIXTURE_REF_NODES = exportFormat(FIXTURE_NODES);
export const nodes_route = apiUrl('/Nodes/?*');

export const FIXTURE_SYSTEMAPPLICATIONS_HEALTH ="systemAppHealth";
export const FIXTURE_REF_SYSTEMAPPLICATIONS_HEALTH = exportFormat(FIXTURE_SYSTEMAPPLICATIONS_HEALTH);
export const systemApplicationHealth_route = apiUrl('/Applications/System/$/GetHealth*');

export const FIXTURE_UPGRADEPROGRESS ="upgradeProgress";
export const FIXTURE_REF_UPGRADEPROGRESS = exportFormat(FIXTURE_UPGRADEPROGRESS);
export const upgradeProgress_route = apiUrl('/$/GetUpgradeProgress*');

export const FIXTURE_UPGRADEREPAIRTASK ="GetRepairTaskList";
export const FIXTURE_REF_UPGRADEREPAIRTASK = exportFormat(FIXTURE_UPGRADEPROGRESS);
export const repairTask_route = apiUrl('/$/GetRepairTaskList?*');

export const addRoute = (fixtureName, fixtureFileName, route, requestType = 'GET') => {
    cy.intercept(requestType, route, {fixture: fixtureFileName}).as(fixtureRequestFormatter(fixtureName))
}

export const addDefaultFixtures = () => {
    addRoute(FIXTURE_AAD, 'aad.json', aad_route)
    addRoute(FIXTURE_APPS, 'applications.json', apps_route)
    addRoute(FIXTURE_APPTYPES, 'appType.json', apptypes_route)
    addRoute(FIXTURE_CLUSTERHEALTH, 'clusterHealth.json', clusterHealth_route)
    addRoute(FIXTURE_CLUSTERHEALTHCHUNK, 'clusterHealthChunk.json', clusterHealthChunk_route, 'POST')
    addRoute(FIXTURE_MANIFEST, 'clusterManifest.json', manifest_route)
    addRoute(FIXTURE_NODES, 'nodes.json', nodes_route)
    addRoute(FIXTURE_SYSTEMAPPLICATIONS_HEALTH, 'systemApplicationHealth.json', systemApplicationHealth_route)
    addRoute(FIXTURE_UPGRADEPROGRESS, 'upgradeProgress.json', upgradeProgress_route)
    addRoute(FIXTURE_UPGRADEREPAIRTASK, 'emptyRepairJobs.json', repairTask_route)

    addRoute('visualObjectsApplicationType', 'visualObjectsApplicationType.json', apiUrl('/Applications/VisualObjectsApplicationType/*'))
}


export const addDefaultAppTypeFixtures = () => {
    addDefaultFixtures();
}

/**
Cause an SFX refresh by pressing the refresh button in page.
*/
export const refresh = () => {
    cy.get("[data-cy=refresh]").click();
}

export const turnOffRefresh = () => {
    cy.get("[data-cy=refreshrate]").within( () => {
        cy.contains("Off").click();
    })
}

/*
Get the number of rows in a table.
This should be used when there is only one table within scope.
*/
export const checkTableSize = (size) => {
    return cy.get('tbody > tr').should('have.length', size);
}

export const EMPTY_LIST_TEXT = "No items to display.";

