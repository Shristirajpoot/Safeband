import React, { useState } from 'react';
import { 
  Heart, Activity, Thermometer, Wifi, Battery, AlertTriangle, 
  Bell, Settings, User, Bluetooth, MapPin, Clock, TrendingUp 
} from 'lucide-react';
import './App.css';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home'); // home, alerts, settings
  const [isConnected, setIsConnected] = useState(true);
  const [safeRange, setSafeRange] = useState(5);
  const [childState, setChildState] = useState('CALM');
  const [vitals, setVitals] = useState({
    heartRate: 82,
    temperature: 36.8,
    battery: 75,
    distance: 3.2,
    lastUpdate: new Date().toLocaleTimeString()
  });

  const getStateColor = (state) => {
    const colors = {
      'CALM': '#34D399', 
      'ACTIVE': '#3B82F6', 
      'STRESSED': '#FACC15', 
      'PANIC': '#EF4444'
    };
    return colors[state] || '#9CA3AF';
  };

  const getStateText = (state) => {
    const texts = {
      'CALM': 'All Good',
      'ACTIVE': 'Active',
      'STRESSED': 'Stressed',
      'PANIC': 'DANGER!'
    };
    return texts[state] || 'Unknown';
  };

  // ---------------- SCREENS ----------------
  const HomeScreen = () => (
    <div className="screen">
      <div className="card">
        <div className="card-header">
          <div>
            <h2>Child Status</h2>
            <p>Real-time monitoring</p>
          </div>
          <div className="state-circle" style={{ backgroundColor: getStateColor(childState) }}>
            <Heart size={32} color="white" />
          </div>
        </div>
        <div className={`state-text ${childState.toLowerCase()}`}>{getStateText(childState)}</div>
        <div className="update-time">
          <Clock size={16} /> Updated: {vitals.lastUpdate}
        </div>
      </div>

      <div className="vitals-grid">
        <div className="vital heart">
          <div className="vital-header"><Heart size={20} /> Heart Rate</div>
          <div className="vital-value">{vitals.heartRate}</div>
          <div className="vital-unit">BPM</div>
        </div>

        <div className="vital temp">
          <div className="vital-header"><Thermometer size={20} /> Temperature</div>
          <div className="vital-value">{vitals.temperature}</div>
          <div className="vital-unit">°C</div>
        </div>

        <div className="vital distance">
          <div className="vital-header"><MapPin size={20} /> Distance</div>
          <div className="vital-value">{vitals.distance}</div>
          <div className="vital-unit">m</div>
        </div>

        <div className="vital battery">
          <div className="vital-header"><Battery size={20} /> Battery</div>
          <div className="vital-value">{vitals.battery}%</div>
          <div className="vital-unit">Remaining</div>
        </div>
      </div>

      <div className="card">
        <div className="range-header">
          <h3>Safe Range</h3>
          <div>{safeRange}m</div>
        </div>
        <input
          type="range"
          min="3"
          max="10"
          value={safeRange}
          onChange={(e) => setSafeRange(parseInt(e.target.value))}
          className="range-input"
        />
        <div className="range-labels">
          <span>3m</span>
          <span>5m</span>
          <span>7m</span>
          <span>10m</span>
        </div>
      </div>

      <div className="actions-grid">
        <button className="panic-btn" onClick={() => setChildState(childState === 'PANIC' ? 'CALM' : 'PANIC')}>
          <AlertTriangle size={24} /> Test Panic Alert
        </button>
        <button className="connect-btn" onClick={() => setIsConnected(!isConnected)}>
          <Bluetooth size={24} /> {isConnected ? 'Connected' : 'Disconnected'}
        </button>
      </div>
    </div>
  );

  const ConnectionScreen = () => (
    <div className="screen center">
      <div className="card center-card">
        <div className="circle pulse"><Bluetooth size={48} color="#1E40AF" /></div>
        <h2>Connect to SafeBand</h2>
        <p>Make sure the wearable is turned on and nearby</p>
        <button className="connect-btn" onClick={() => setIsConnected(true)}>Connect</button>
      </div>
    </div>
  );

  const AlertsScreen = () => (
    <div className="screen">
      <h2 className="section-title">Alert History</h2>
      <div className="alerts-list">
        <div className="alert alert-red">
          <div className="alert-icon"><AlertTriangle size={20} color="white" /></div>
          <div className="alert-content">
            <div className="alert-title">PANIC ALERT</div>
            <div className="alert-desc">Heart rate spike detected: 145 BPM</div>
            <div className="alert-time">Today at 2:34 PM</div>
          </div>
        </div>
        <div className="alert alert-yellow">
          <div className="alert-icon"><MapPin size={20} color="white" /></div>
          <div className="alert-content">
            <div className="alert-title">Perimeter Breach</div>
            <div className="alert-desc">Child moved 7.2m away</div>
            <div className="alert-time">Today at 1:15 PM</div>
          </div>
        </div>
        <div className="alert alert-orange">
          <div className="alert-icon"><TrendingUp size={20} color="white" /></div>
          <div className="alert-content">
            <div className="alert-title">Elevated Stress</div>
            <div className="alert-desc">HRV decreased, temperature rising</div>
            <div className="alert-time">Today at 11:47 AM</div>
          </div>
        </div>
        <div className="alert alert-gray">
          <div className="alert-icon"><Wifi size={20} color="white" /></div>
          <div className="alert-content">
            <div className="alert-title">Connection Lost</div>
            <div className="alert-desc">BLE signal lost for 2 minutes</div>
            <div className="alert-time">Today at 9:22 AM</div>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsScreen = () => (
    <div className="screen">
      <h2 className="section-title">Settings</h2>

      <div className="card">
        <h3 className="card-title"><User size={20} color="#2563EB" /> Child Profile</h3>
        <div className="form-group">
          <label>Name</label>
          <input type="text" defaultValue="Emma" />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" defaultValue="6" />
        </div>
      </div>

      <div className="card">
        <h3 className="card-title"><Bell size={20} color="#2563EB" /> Alert Settings</h3>
        <div className="toggle-row">
          <span>Sound Alerts</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="toggle-row">
          <span>Vibration</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="toggle-row">
          <span>Push Notifications</span>
          <input type="checkbox" defaultChecked />
        </div>
      </div>

      <div className="card">
        <h3 className="card-title"><Settings size={20} color="#2563EB" /> Device Settings</h3>
        <button className="settings-btn">Calibrate Sensors</button>
        <button className="settings-btn">Update Firmware</button>
        <button className="settings-btn danger">Unpair Device</button>
      </div>

      <div className="card">
        <h3 className="card-title">About</h3>
        <div className="about-info">
          <div>Version: 1.0.0</div>
          <div>Device: SafeBand #A47F</div>
          <div>Firmware: v2.1.4</div>
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    if (!isConnected) return <ConnectionScreen />;
    if (activeScreen === 'home') return <HomeScreen />;
    if (activeScreen === 'alerts') return <AlertsScreen />;
    if (activeScreen === 'settings') return <SettingsScreen />;
    return <HomeScreen />;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>SafeBand</h1>
        <div className="connection-status">
          <Wifi size={20} /> {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </header>

      {renderScreen()}

      <footer className="app-footer">
        <button onClick={() => setActiveScreen('home')}>Home</button>
        <button onClick={() => setActiveScreen('alerts')}>Alerts</button>
        <button onClick={() => setActiveScreen('settings')}>Settings</button>
      </footer>
    </div>
  );
}
