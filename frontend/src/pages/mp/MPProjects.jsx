import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import MPLayout from "../../components/mp/MPLayout";
import ProjectsTable from "../../components/mp/projects/ProjectsTable";
import projectsMockData from "../../data/projectsMockData";

const ITEMS_PER_PAGE = 8;

const MPProjects = () => {
  const [searchText, setSearchText] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    searchText: "",
    district: "",
    status: "",
    risk: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  /*
   * Create district filter options from actual project data.
   */
  const districts = useMemo(() => {
    return [...new Set(projectsMockData.map((project) => project.district))]
      .filter(Boolean)
      .sort();
  }, []);

  /*
   * Create status filter options from actual project data.
   */
  const statuses = useMemo(() => {
    return [
      ...new Set(
        projectsMockData
          .map((project) => project.current_status)
          .filter(Boolean)
      ),
    ].sort();
  }, []);

  /*
   * Create risk filter options from actual project data.
   */
  const riskLevels = useMemo(() => {
    return [
      ...new Set(
        projectsMockData
          .map((project) => project.risk_level)
          .filter(Boolean)
      ),
    ].sort();
  }, []);

  /*
   * Convert database-style status into readable text.
   */
  const formatStatusLabel = (status) => {
    if (!status) return "";

    const statusMap = {
      COMPLETED: "Completed",
      ONGOING: "Ongoing",
      IN_PROGRESS: "In Progress",
      ON_HOLD: "On Hold",
      NOT_STARTED: "Not Started",
    };

    return statusMap[status] || status;
  };

  /*
   * Apply search and selected filters.
   */
  const filteredProjects = useMemo(() => {
    return projectsMockData.filter((project) => {
      const searchValue = appliedFilters.searchText
        .trim()
        .toLowerCase();

      const matchesSearch =
        !searchValue ||
        project.project_id?.toLowerCase().includes(searchValue) ||
        project.project_name?.toLowerCase().includes(searchValue);

      const matchesDistrict =
        !appliedFilters.district ||
        project.district === appliedFilters.district;

      const matchesStatus =
        !appliedFilters.status ||
        project.current_status === appliedFilters.status;

      const matchesRisk =
        !appliedFilters.risk ||
        project.risk_level === appliedFilters.risk;

      return (
        matchesSearch &&
        matchesDistrict &&
        matchesStatus &&
        matchesRisk
      );
    });
  }, [appliedFilters]);

  const totalProjects = filteredProjects.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalProjects / ITEMS_PER_PAGE)
  );

  /*
   * Get only the projects required for the current page.
   */
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage]);

  /*
   * Apply current filter selections.
   */
  const handleApplyFilters = () => {
    setAppliedFilters({
      searchText,
      district: districtFilter,
      status: statusFilter,
      risk: riskFilter,
    });

    setCurrentPage(1);
  };

  /*
   * Reset all filters.
   */
  const handleResetFilters = () => {
    setSearchText("");
    setDistrictFilter("");
    setStatusFilter("");
    setRiskFilter("");

    setAppliedFilters({
      searchText: "",
      district: "",
      status: "",
      risk: "",
    });

    setCurrentPage(1);
  };

  return (
    <MPLayout>
      <div className="w-full">
        {/* =========================
            Page Header
        ========================== */}
        <div className="mb-[18px]">
          <h1
            className="
              m-0
              text-[32px]
              font-semibold
              tracking-[-0.4px]
              text-[#153A58]

              max-md:text-[26px]
            "
          >
            Projects
          </h1>

          <p
            className="
              mt-[6px]
              text-[14px]
              font-medium
              text-[#7E8F9D]

              max-md:text-[13px]
            "
          >
            Monitor sanctioned projects and their implementation progress
          </p>
        </div>

        {/* =========================
            Search & Filters
        ========================== */}
        <section
          className="
            rounded-[12px]
            border border-[#E3EAF0]
            bg-white
            px-[20px]
            py-[18px]
            shadow-[0_4px_14px_rgba(18,52,77,0.05)]

            max-md:px-[16px]
            max-md:py-[16px]
          "
        >
          <div
            className="
              grid
              grid-cols-[minmax(280px,1.5fr)_minmax(150px,0.7fr)_minmax(150px,0.7fr)_minmax(150px,0.7fr)_auto]
              items-end
              gap-[14px]

              max-xl:grid-cols-2
              max-md:grid-cols-1
            "
          >
            {/* Search */}
            <div>
              <label
                htmlFor="project-search"
                className="
                  mb-[7px]
                  block
                  text-[12px]
                  font-semibold
                  text-[#6F8392]
                "
              >
                Search Project
              </label>

              <div className="relative">
                <Search
                  size={18}
                  strokeWidth={1.8}
                  className="
                    absolute
                    left-[13px]
                    top-1/2
                    -translate-y-1/2
                    text-[#7F93A2]
                  "
                />

                <input
                  id="project-search"
                  type="text"
                  value={searchText}
                  onChange={(event) =>
                    setSearchText(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleApplyFilters();
                    }
                  }}
                  placeholder="Search by Project ID or name..."
                  className="
                    h-[42px]
                    w-full
                    rounded-[8px]
                    border
                    border-[#DCE5EC]
                    bg-white
                    pl-[42px]
                    pr-[14px]
                    text-[13px]
                    font-medium
                    text-[#244760]
                    outline-none
                    transition-colors

                    placeholder:text-[#9AA8B3]

                    focus:border-[#8FAFC5]
                  "
                />
              </div>
            </div>

            {/* District */}
            <div>
              <label
                htmlFor="district-filter"
                className="
                  mb-[7px]
                  block
                  text-[12px]
                  font-semibold
                  text-[#6F8392]
                "
              >
                District
              </label>

              <select
                id="district-filter"
                value={districtFilter}
                onChange={(event) =>
                  setDistrictFilter(event.target.value)
                }
                className="
                  h-[42px]
                  w-full
                  rounded-[8px]
                  border
                  border-[#DCE5EC]
                  bg-white
                  px-[12px]
                  text-[13px]
                  font-medium
                  text-[#456075]
                  outline-none

                  focus:border-[#8FAFC5]
                "
              >
                <option value="">All Districts</option>

                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status-filter"
                className="
                  mb-[7px]
                  block
                  text-[12px]
                  font-semibold
                  text-[#6F8392]
                "
              >
                Status
              </label>

              <select
                id="status-filter"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="
                  h-[42px]
                  w-full
                  rounded-[8px]
                  border
                  border-[#DCE5EC]
                  bg-white
                  px-[12px]
                  text-[13px]
                  font-medium
                  text-[#456075]
                  outline-none

                  focus:border-[#8FAFC5]
                "
              >
                <option value="">All Status</option>

                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {formatStatusLabel(status)}
                  </option>
                ))}
              </select>
            </div>

            {/* Risk */}
            <div>
              <label
                htmlFor="risk-filter"
                className="
                  mb-[7px]
                  block
                  text-[12px]
                  font-semibold
                  text-[#6F8392]
                "
              >
                Risk Level
              </label>

              <select
                id="risk-filter"
                value={riskFilter}
                onChange={(event) =>
                  setRiskFilter(event.target.value)
                }
                className="
                  h-[42px]
                  w-full
                  rounded-[8px]
                  border
                  border-[#DCE5EC]
                  bg-white
                  px-[12px]
                  text-[13px]
                  font-medium
                  text-[#456075]
                  outline-none

                  focus:border-[#8FAFC5]
                "
              >
                <option value="">All Risk Levels</option>

                {riskLevels.map((risk) => (
                  <option key={risk} value={risk}>
                    {risk}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div
              className="
                flex
                items-center
                gap-[9px]

                max-xl:col-span-2
                max-xl:justify-end

                max-md:col-span-1
                max-md:w-full
              "
            >
              <button
                type="button"
                onClick={handleApplyFilters}
                className="
                  h-[42px]
                  rounded-[8px]
                  bg-[#0F4F78]
                  px-[20px]
                  text-[13px]
                  font-semibold
                  text-white
                  transition-colors

                  hover:bg-[#0B4266]

                  max-md:flex-1
                "
              >
                Apply
              </button>

              <button
                type="button"
                onClick={handleResetFilters}
                className="
                  h-[42px]
                  rounded-[8px]
                  border
                  border-[#CBD9E3]
                  bg-white
                  px-[18px]
                  text-[13px]
                  font-semibold
                  text-[#315E7F]
                  transition-colors

                  hover:bg-[#F7FAFC]

                  max-md:flex-1
                "
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* =========================
            Projects Table
        ========================== */}
        <ProjectsTable
          projects={paginatedProjects}
          totalProjects={totalProjects}
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={() =>
            setCurrentPage((page) => Math.max(1, page - 1))
          }
          onNext={() =>
            setCurrentPage((page) =>
              Math.min(totalPages, page + 1)
            )
          }
        />
      </div>
    </MPLayout>
  );
};

export default MPProjects;