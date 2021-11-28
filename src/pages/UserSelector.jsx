import React, { useState, useEffect } from "react";
import { Container, Form, Alert, Button } from "react-bootstrap";

function UserSelector() {
  return (
    <>
      <Form.Control as="select" defaultValue="Choose...">
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
    </>
  );
}

export default UserSelector;
