import React, { useState } from 'react';
import './App.css';
import StoryModal from './components/StoryModal';

// Globale Instanz der Nodes
export const NODES = [
  { id: 1, label: 'Hacker' },
  { id: 2, label: 'Information' },
  { id: 3, label: 'Social Media' },
  { id: 4, label: 'Databases' },
  { id: 5, label: 'OSINT' },
  { id: 6, label: 'Websites' },
  { id: 7, label: 'the Target' }
];

// Globale Instanz der Edges
export const EDGES = [
  'gathering',
  'attacks with',
  'harvest from',
  'analzye from',
  'scanned from'
];

const ATTACK_NODES = [
  'fake recruiter mail',
  'fake amazon delivery mail',
  'personalized email',
  'social media message',
  'DDos'
];

function App() {
  const [showStory, setShowStory] = useState(true);
  const [edge, setEdge] = useState<string | null>(null);
  const [selecting, setSelecting] = useState(false);
  const [nextAction, setNextAction] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Für Target-Node Auswahl
  const [showTargetAction, setShowTargetAction] = useState(false);
  const [targetNode, setTargetNode] = useState<string | null>(null);

  // Auswahlmöglichkeiten für den zweiten Klick
  let nextNodeOptions: string[] = [];
  if (edge === 'gathering') {
    nextNodeOptions = ['Information'];
  } else if (edge === 'attacks with') {
    nextNodeOptions = ATTACK_NODES;
  }

  return (
    <div className="App">
      {showStory && <StoryModal onClose={() => setShowStory(false)} />}
      <div className={showStory ? "blurred" : ""}>
        <h1 className="title">Find the attack vector</h1>
        <div className="game-board">
          <div className="hacker-row">
            <div className="node">Hacker</div>
            
            {edge === null && !selecting && (
              <button
                className="action-field"
                onClick={() => setSelecting(true)}
              >
                +
              </button>
            )}
            {selecting && (
              <div className="edge-options">
                <button
                  className="action-field edge-option"
                  onClick={() => {
                    setEdge('gathering');
                    setSelecting(false);
                    setNextAction(false);
                    setSelectedNode(null);
                    setShowTargetAction(false);
                    setTargetNode(null);
                  }}
                >
                  gathering
                </button>
                <button
                  className="action-field edge-option"
                  onClick={() => {
                    setEdge('attacks with');
                    setSelecting(false);
                    setNextAction(false);
                    setSelectedNode(null);
                    setShowTargetAction(false);
                    setTargetNode(null);
                  }}
                >
                  attacks with
                </button>
              </div>
            )}
            {(edge === 'gathering' || edge === 'attacks with') && !selecting && (
              <div className="edge-rect-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="edge-rect">
                  {edge}
                  <button
                    className="edge-delete"
                    onClick={() => {
                      setEdge(null);
                      setNextAction(false);
                      setSelectedNode(null);
                      setShowTargetAction(false);
                      setTargetNode(null);
                    }}
                    aria-label="Delete edge"
                  >
                    ×
                  </button>
                </div>
                {/* Zweiter Klick: Node Auswahl */}
                {selectedNode === null && !nextAction && (
                  <button
                    className="action-field"
                    style={{ marginLeft: 12 }}
                    onClick={() => setNextAction(true)}
                  >
                    +
                  </button>
                )}
                {selectedNode !== null && (
                  <div className="node node-with-delete" style={{ marginLeft: 12, position: 'relative' }}>
                    {selectedNode}
                    <button
                      className="node-delete"
                      onClick={() => {
                        setSelectedNode(null);
                        setShowTargetAction(false);
                        setTargetNode(null);
                      }}
                      aria-label="Delete node"
                    >
                      ×
                    </button>
                  </div>
                )}
                {/* Target-Clickable nur für attacks with + Attack Node */}
                {edge === 'attacks with' &&
                  selectedNode !== null &&
                  ATTACK_NODES.includes(selectedNode) &&
                  !showTargetAction &&
                  !targetNode && (
                    <button
                      className="action-field"
                      style={{ marginLeft: 12 }}
                      onClick={() => setShowTargetAction(true)}
                    >
                      +
                    </button>
                  )}
                {/* Target Node Auswahl */}
                {showTargetAction && !targetNode && (
                  <div className="edge-options" style={{ marginLeft: 12 }}>
                    <button
                      className="action-field edge-option"
                      onClick={() => setTargetNode('the Target')}
                    >
                      the target
                    </button>
                  </div>
                )}
                {/* Target Node anzeigen */}
                {targetNode && (
                  <div className="node node-with-delete" style={{ marginLeft: 12, position: 'relative' }}>
                    {targetNode}
                    <button
                      className="node-delete"
                      onClick={() => setTargetNode(null)}
                      aria-label="Delete node"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Node-Auswahl anzeigen */}
            {nextAction && selectedNode === null && (
              <div className="edge-options" style={{ marginLeft: 12 }}>
                {nextNodeOptions.map((node) => (
                  <button
                    key={node}
                    className="action-field edge-option"
                    onClick={() => {
                      setSelectedNode(node);
                      setNextAction(false);
                    }}
                  >
                    {node}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;