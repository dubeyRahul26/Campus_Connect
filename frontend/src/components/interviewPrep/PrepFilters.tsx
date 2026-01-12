interface Props {
  filters: any;
  setFilters: (f: any) => void;
  onApply: () => void;
  onClear: () => void;
}

export default function PrepFilters({
  filters,
  setFilters,
  onApply,
  onClear,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <input
          placeholder="Search"
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
          className="px-4 py-2 rounded-lg border bg-gray-50"
        />

        <select
          value={filters.type}
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value })
          }
          className="px-4 py-2 rounded-lg border bg-gray-50"
        >
          <option value="">All Types</option>
          <option>Experience</option>
          <option>Questions</option>
          <option>Tips</option>
        </select>

        <input
          placeholder="Company"
          value={filters.company}
          onChange={(e) =>
            setFilters({ ...filters, company: e.target.value })
          }
          className="px-4 py-2 rounded-lg border bg-gray-50"
        />

        <input
          placeholder="Role"
          value={filters.role}
          onChange={(e) =>
            setFilters({ ...filters, role: e.target.value })
          }
          className="px-4 py-2 rounded-lg border bg-gray-50"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-2">
        <button
          onClick={onClear}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300"
        >
          Clear
        </button>
        <button
          onClick={onApply}
          className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
