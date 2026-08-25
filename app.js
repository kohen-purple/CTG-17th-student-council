/* ============================================================
   Shared data layer.
   NOTE: this demo stores everything in the browser's
   localStorage. It is NOT a real private backend — anyone using
   the same browser/device can open dev tools and read it, and
   submissions will not be visible from any other device. See the
   README for how to swap this for a real database when you're
   ready to go live.
   ============================================================ */

const STORAGE_KEYS = {
  submissions: 'pb_submissions',
  board: 'pb_board',
};

function readList(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Could not read', key, e);
    return [];
  }
}

function writeList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

const PrayerBoard = {
  addSubmission({ type, name, message }) {
    const list = readList(STORAGE_KEYS.submissions);
    list.unshift({
      id: makeId(),
      type, // 'ask' | 'prayer'
      name: (name || '').trim(),
      message: message.trim(),
      date: new Date().toISOString(), // stores the exact time+date it was sent
      seen: false, // used for prayer requests, checked off by admin once read
    });
    writeList(STORAGE_KEYS.submissions, list);
  },

  getSubmissions() {
    return readList(STORAGE_KEYS.submissions);
  },

  deleteSubmission(id) {
    const list = readList(STORAGE_KEYS.submissions).filter(s => s.id !== id);
    writeList(STORAGE_KEYS.submissions, list);
  },

  // Prayer requests are private only — admin can mark them seen/unseen,
  // but they never get published to the public board.
  setSubmissionSeen(id, seen) {
    const list = readList(STORAGE_KEYS.submissions);
    const item = list.find(s => s.id === id);
    if (!item) return;
    item.seen = !!seen;
    writeList(STORAGE_KEYS.submissions, list);
  },

  // "Publish" turns an 'ask' submission into a board entry the public can see.
  // Prayer requests are never published — only questions get answered.
  publishSubmissionToBoard(id, answer) {
    const submissions = readList(STORAGE_KEYS.submissions);
    const item = submissions.find(s => s.id === id);
    if (!item) return;
    const board = readList(STORAGE_KEYS.board);
    board.unshift({
      id: makeId(),
      question: item.message,
      answer: (answer || '').trim(),
      date: new Date().toISOString(),
    });
    writeList(STORAGE_KEYS.board, board);
    this.deleteSubmission(id);
  },

  getBoard() {
    return readList(STORAGE_KEYS.board);
  },

  addBoardEntry({ question, answer }) {
    const board = readList(STORAGE_KEYS.board);
    board.unshift({
      id: makeId(),
      question: question.trim(),
      answer: answer.trim(),
      date: new Date().toISOString(),
    });
    writeList(STORAGE_KEYS.board, board);
  },

  updateBoardEntry(id, { question, answer }) {
    const board = readList(STORAGE_KEYS.board);
    const item = board.find(b => b.id === id);
    if (!item) return;
    if (question !== undefined) item.question = question.trim();
    if (answer !== undefined) item.answer = answer.trim();
    writeList(STORAGE_KEYS.board, board);
  },

  deleteBoardEntry(id) {
    const board = readList(STORAGE_KEYS.board).filter(b => b.id !== id);
    writeList(STORAGE_KEYS.board, board);
  },
};
