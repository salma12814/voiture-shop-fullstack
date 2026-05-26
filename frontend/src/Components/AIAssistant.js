import React, { useState } from 'react';
import { Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

function AIAssistant({ voiture }) {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');

  const getSummary = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8081/api/ai/voitures/${voiture.id}/summary`);
      setResponse(res.data);
    } catch (err) {
      setResponse('Erreur: ' + err.message);
    }
    setLoading(false);
  };

  const askQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:8081/api/ai/voitures/${voiture.id}/ask`, question);
      setResponse(res.data);
    } catch (err) {
      setResponse('Erreur: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <Card className="mt-3 border border-info bg-dark text-white">
      <Card.Header className="bg-info text-dark">
        🤖 Assistant IA (Ollama)
      </Card.Header>
      <Card.Body>
        <Button 
          onClick={getSummary} 
          disabled={loading} 
          variant="info" 
          className="me-2"
        >
          {loading ? <Spinner size="sm" /> : '📝 Résumé de la voiture'}
        </Button>

        <Form.Group className="mt-3">
          <Form.Label>Posez une question</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ex: Est-ce que cette voiture est économique ?"
            className="bg-secondary text-white"
          />
          <Button 
            onClick={askQuestion} 
            disabled={loading || !question.trim()} 
            variant="success" 
            className="mt-2"
          >
            {loading ? <Spinner size="sm" /> : '💬 Poser la question'}
          </Button>
        </Form.Group>

        {response && (
          <Alert variant="info" className="mt-3">
            <Alert.Heading>Réponse :</Alert.Heading>
            <div style={{ whiteSpace: 'pre-line' }}>{response}</div>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default AIAssistant;