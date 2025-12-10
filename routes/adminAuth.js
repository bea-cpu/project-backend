const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyAdmin = require('../middlewares/adminAuth'); 

router.get('/reports', verifyAdmin, async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM waste_reports ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch admin reports:', err);
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
});

router.put('/reports/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const [result] = await db.execute(
      'UPDATE waste_reports SET status = ? WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Report not found' });

    res.json({ message: 'Status updated successfully' });
  } catch (err) {
    console.error('Failed to update report status:', err);
    res.status(500).json({ message: 'Failed to update status' });
  }
});

module.exports = router;
