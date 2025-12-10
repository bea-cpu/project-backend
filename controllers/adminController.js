const db = require('../config/db');

const getAllReports = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM waste_reports ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT id, fullName, email, role FROM users ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

const updateReport = async (req, res) => {
  const reportId = req.params.id;
  const { status, description, priority, location } = req.body;

  try {
    const [result] = await db.execute(
      `UPDATE waste_reports 
       SET status = ?, description = ?, priority = ?, location = ? 
       WHERE id = ?`,
      [status, description, priority, location, reportId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ message: 'Report updated successfully' });
  } catch (err) {
    console.error('Error updating report:', err);
    res.status(500).json({ message: 'Failed to update report' });
  }
};

const deleteReport = async (req, res) => {
  const reportId = req.params.id;

  try {
    const [result] = await db.execute('DELETE FROM waste_reports WHERE id = ?', [reportId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ message: 'Report deleted successfully' });
  } catch (err) {
    console.error('Error deleting report:', err);
    res.status(500).json({ message: 'Failed to delete report' });
  }
};

module.exports = { getAllReports, getAllUsers, updateReport, deleteReport };
