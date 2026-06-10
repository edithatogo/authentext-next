const assert = require('assert');
const { HumanizerMCPServer } = require('../lib/mcp-server');
const { HumanizerSwarmer } = require('../lib/swarmer');

/**

* TDD: Verifying Swarming Logic
 */

console.log("Running Swarmer tests...");

async function testSwarm() {
    const server = new HumanizerMCPServer();
    const swarmer = new HumanizerSwarmer(server);

    const toolsToCall = ['humanizer-next', 'humanizer-logic'];
    const results = await swarmer.swarm({
        tools: toolsToCall,
        args: { text: "Some input text" }
    });

    console.log(`- Received ${results.length} results`);
    assert.strictEqual(results.length, 2, "Should return 2 results");
    
    results.forEach(res => {
        assert.strictEqual(res.status, 'success', `Tool ${res.tool} should succeed`);
    });

    console.log("Swarmer tests passed!");
}

testSwarm().catch(err => {
    console.error("Test Failed:", err.message);
    process.exit(1);
});
