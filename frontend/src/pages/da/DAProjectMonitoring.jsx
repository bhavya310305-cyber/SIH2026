import { useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DALayout from "../../components/da/DALayout";
import projectsMockData from "../../data/projectsMockData";

const ITEMS_PER_PAGE = 8;

const DAProjectMonitoring = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [agency, setAgency] = useState("");
  const [status, setStatus] = useState("");
  const [risk, setRisk] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    agency: "",
    status: "",
    risk: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const districtProjects = projectsMockData;

  const newestFirstProjects = useMemo(() => {
    return [...districtProjects].sort((a, b) => {
      const dateA =
        a.assigned_at ||
        a.created_at ||
        a.work_start_date ||
        null;

      const dateB =
        b.assigned_at ||
        b.created_at ||
        b.work_start_date ||
        null;

      if (dateA && dateB) {
        const timeA = new Date(dateA).getTime();
        const timeB = new Date(dateB).getTime();

        if (timeA !== timeB) {
          return timeB - timeA;
        }
      }

      return (
        getProjectSequence(b.project_id) -
        getProjectSequence(a.project_id)
      );
    });
  }, [districtProjects]);

  /*
   * IMPLEMENTING AGENCIES
   */
  const agencies = useMemo(() => {
    return [
      ...new Set(
        districtProjects
          .map((project) => getAgencyName(project))
          .filter(Boolean)
      ),
    ].sort();
  }, [districtProjects]);

  /*
   * PROJECT STATUSES
   */
  const statuses = useMemo(() => {
    return [
      ...new Set(
        districtProjects
          .map((project) => project.current_status)
          .filter(Boolean)
      ),
    ].sort();
  }, [districtProjects]);

  /*
   * RISK LEVELS
   */
  const risks = useMemo(() => {
    return [
      ...new Set(
        districtProjects
          .map((project) => project.risk_level)
          .filter(Boolean)
      ),
    ].sort();
  }, [districtProjects]);

  /*
   * FILTER PROJECTS
   */
  const filteredProjects = useMemo(() => {
    return newestFirstProjects.filter((project) => {
      const searchValue =
        appliedFilters.search.trim().toLowerCase();

      const agencyName = getAgencyName(project);

      const matchesSearch =
        !searchValue ||
        project.project_id
          ?.toLowerCase()
          .includes(searchValue) ||
        project.project_name
          ?.toLowerCase()
          .includes(searchValue);

      const matchesAgency =
        !appliedFilters.agency ||
        agencyName === appliedFilters.agency;

      const matchesStatus =
        !appliedFilters.status ||
        project.current_status ===
          appliedFilters.status;

      const matchesRisk =
        !appliedFilters.risk ||
        project.risk_level === appliedFilters.risk;

      return (
        matchesSearch &&
        matchesAgency &&
        matchesStatus &&
        matchesRisk
      );
    });
  }, [newestFirstProjects, appliedFilters]);

  /*
   * PAGINATION
   */
  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProjects.length / ITEMS_PER_PAGE
    )
  );

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /*
   * APPLY FILTERS
   */
  const handleApplyFilters = () => {
    setAppliedFilters({
      search,
      agency,
      status,
      risk,
    });

    setCurrentPage(1);
  };

  /*
   * RESET FILTERS
   */
  const handleResetFilters = () => {
    setSearch("");
    setAgency("");
    setStatus("");
    setRisk("");

    setAppliedFilters({
      search: "",
      agency: "",
      status: "",
      risk: "",
    });

    setCurrentPage(1);
  };

  /*
   * OPEN PROJECT DETAIL
   */
  const handleProjectOpen = (projectId) => {
    navigate(`/da/projects/${projectId}`);
  };

  return (
    <DALayout>
      <div className="w-full">
        {/* =====================================================
            PAGE HEADING
        ====================================================== */}
        <div
          className="
            mb-[18px]
            flex
            items-end
            justify-between
            gap-[20px]

            max-md:flex-col
            max-md:items-start
            max-md:gap-[9px]
          "
        >
          <div>
            <h1
              className="
                text-[28px]
                font-semibold
                leading-[1.2]
                tracking-[-0.35px]
                text-[#153A58]

                max-md:text-[25px]
              "
            >
              Project Monitoring
            </h1>

            <p
              className="
                mt-[5px]
                text-[13px]
                leading-[1.5]
                text-[#718794]
              "
            >
              Monitor MPLADS works, expenditure,
              progress, and AI-identified risks across
              the district.
            </p>
          </div>

          <div
            className="
              rounded-full
              border
              border-[#DDE7ED]
              bg-white
              px-[13px]
              py-[6px]
              text-[11px]
              font-medium
              text-[#58758A]
            "
          >
            Latest projects shown first
          </div>
        </div>

        {/* =====================================================
            SEARCH + FILTERS
        ====================================================== */}
        <section
          className="
            rounded-[12px]
            border
            border-[#E1E8ED]
            bg-white
            px-[18px]
            py-[15px]
            shadow-[0_3px_12px_rgba(18,52,77,0.035)]
          "
        >
          <div
            className="
              grid
              grid-cols-[minmax(250px,1.4fr)_repeat(3,minmax(140px,0.7fr))_auto]
              gap-[10px]

              max-xl:grid-cols-2
              max-md:grid-cols-1
            "
          >
            {/* Search */}
            <div className="relative">
              <Search
                size={17}
                strokeWidth={1.8}
                className="
                  absolute
                  left-[13px]
                  top-1/2
                  -translate-y-1/2
                  text-[#8396A3]
                "
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleApplyFilters();
                  }
                }}
                placeholder="Search Project ID or Project Name"
                className="
                  h-[42px]
                  w-full
                  rounded-[8px]
                  border
                  border-[#DDE6EB]
                  bg-white
                  pl-[40px]
                  pr-[13px]
                  text-[13px]
                  text-[#294E65]
                  outline-none
                  transition-colors

                  placeholder:text-[#98A7B0]

                  focus:border-[#6F9EBB]
                "
              />
            </div>

            {/* Implementing Agency */}
            <select
              value={agency}
              onChange={(event) =>
                setAgency(event.target.value)
              }
              className="
                h-[42px]
                rounded-[8px]
                border
                border-[#DDE6EB]
                bg-white
                px-[12px]
                text-[13px]
                text-[#456579]
                outline-none

                focus:border-[#6F9EBB]
              "
            >
              <option value="">
                All Implementing Agencies
              </option>

              {agencies.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="
                h-[42px]
                rounded-[8px]
                border
                border-[#DDE6EB]
                bg-white
                px-[12px]
                text-[13px]
                text-[#456579]
                outline-none

                focus:border-[#6F9EBB]
              "
            >
              <option value="">All Status</option>

              {statuses.map((item) => (
                <option key={item} value={item}>
                  {formatStatus(item)}
                </option>
              ))}
            </select>

            {/* Risk */}
            <select
              value={risk}
              onChange={(event) =>
                setRisk(event.target.value)
              }
              className="
                h-[42px]
                rounded-[8px]
                border
                border-[#DDE6EB]
                bg-white
                px-[12px]
                text-[13px]
                text-[#456579]
                outline-none

                focus:border-[#6F9EBB]
              "
            >
              <option value="">All Risk</option>

              {risks.map((item) => (
                <option key={item} value={item}>
                  {formatStatus(item)}
                </option>
              ))}
            </select>

            {/* Buttons */}
            <div className="flex gap-[8px]">
              <button
                type="button"
                onClick={handleApplyFilters}
                className="
                  h-[42px]
                  rounded-[8px]
                  bg-[#07345C]
                  px-[19px]
                  text-[12px]
                  font-semibold
                  text-white
                  transition-colors

                  hover:bg-[#0B416F]
                "
              >
                Apply
              </button>

              <button
                type="button"
                onClick={handleResetFilters}
                aria-label="Reset filters"
                className="
                  flex
                  h-[42px]
                  w-[42px]
                  items-center
                  justify-center
                  rounded-[8px]
                  border
                  border-[#DDE6EB]
                  bg-white
                  text-[#607C8F]
                  transition-colors

                  hover:bg-[#F5F8FA]
                "
              >
                <RotateCcw
                  size={16}
                  strokeWidth={1.8}
                />
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            PROJECT LIST
        ====================================================== */}
        <section
          className="
            mt-[16px]
            overflow-hidden
            rounded-[12px]
            border
            border-[#E1E8ED]
            bg-white
            shadow-[0_3px_12px_rgba(18,52,77,0.035)]
          "
        >
          {/* Table Section Heading */}
          <div
            className="
              flex
              items-center
              justify-between
              gap-[16px]
              border-b
              border-[#E8EDF0]
              px-[20px]
              py-[14px]

              max-sm:px-[15px]
            "
          >
            <div>
              <h2
                className="
                  text-[20px]
                  font-semibold
                  text-[#153A58]
                "
              >
                District MPLADS Projects
              </h2>

              <p
                className="
                  mt-[3px]
                  text-[12px]
                  text-[#7D909C]
                "
              >
                {filteredProjects.length} project
                {filteredProjects.length === 1
                  ? ""
                  : "s"}{" "}
                found
              </p>
            </div>

            <p
              className="
                text-[11px]
                font-medium
                text-[#718794]

                max-sm:hidden
              "
            >
              Monitoring view
            </p>
          </div>

          {/* =====================================================
              DESKTOP TABLE
          ====================================================== */}
          <div className="overflow-x-auto max-md:hidden">
            <table
              className="
                w-full
                min-w-[1280px]
                border-collapse
              "
            >
              <thead>
                <tr className="bg-[#F7F9FB]">
                  <TableHeading>
                    Project ID
                  </TableHeading>

                  <TableHeading>
                    Project Name
                  </TableHeading>

                  <TableHeading>
                    Implementing Agency
                  </TableHeading>

                  <TableHeading>
                    Sanctioned Amount
                  </TableHeading>

                  <TableHeading>
                    Expenditure
                  </TableHeading>

                  <TableHeading>
                    Progress
                  </TableHeading>

                  <TableHeading>
                    Status
                  </TableHeading>

                  <TableHeading>
                    Risk
                  </TableHeading>

                  <th
                    className="
                      px-[15px]
                      py-[12px]
                      text-right
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.4px]
                      text-[#6E8492]
                    "
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedProjects.length > 0 ? (
                  paginatedProjects.map(
                    (project) => (
                      <tr
                        key={project.project_id}
                        className="
                          border-t
                          border-[#EDF1F3]
                          transition-colors

                          hover:bg-[#FAFCFD]
                        "
                      >
                        <td className="px-[15px] py-[15px]">
                          <p
                            className="
                              whitespace-nowrap
                              text-[12px]
                              font-semibold
                              text-[#37617A]
                            "
                          >
                            {project.project_id}
                          </p>
                        </td>

                        <td
                          className="
                            max-w-[260px]
                            px-[15px]
                            py-[15px]
                          "
                        >
                          <p
                            className="
                              text-[14px]
                              font-semibold
                              leading-[1.4]
                              text-[#153E59]
                            "
                          >
                            {project.project_name}
                          </p>

                          {project.district && (
                            <p
                              className="
                                mt-[4px]
                                text-[11px]
                                text-[#7E919D]
                              "
                            >
                              {project.district}
                            </p>
                          )}
                        </td>

                        <td
                          className="
                            max-w-[220px]
                            px-[15px]
                            py-[15px]
                            text-[12px]
                            leading-[1.4]
                            text-[#577184]
                          "
                        >
                          {getAgencyName(project) ||
                            "—"}
                        </td>

                        <td
                          className="
                            whitespace-nowrap
                            px-[15px]
                            py-[15px]
                            text-[13px]
                            font-semibold
                            text-[#365970]
                          "
                        >
                          {formatCurrency(
                            project.sanctioned_amount
                          )}
                        </td>

                        <td
                          className="
                            whitespace-nowrap
                            px-[15px]
                            py-[15px]
                            text-[13px]
                            font-semibold
                            text-[#365970]
                          "
                        >
                          {formatCurrency(
                            getExpenditure(project)
                          )}
                        </td>

                        <td className="px-[15px] py-[15px]">
                          <ProjectProgress
                            progress={
                              project.progress_percentage
                            }
                          />
                        </td>

                        <td className="px-[15px] py-[15px]">
                          <StatusBadge
                            status={
                              project.current_status
                            }
                          />
                        </td>

                        <td className="px-[15px] py-[15px]">
                          <RiskBadge
                            risk={project.risk_level}
                          />
                        </td>

                        <td
                          className="
                            px-[15px]
                            py-[15px]
                            text-right
                          "
                        >
                          <button
                            type="button"
                            onClick={() =>
                              handleProjectOpen(
                                project.project_id
                              )
                            }
                            className="
                              inline-flex
                              items-center
                              gap-[6px]
                              whitespace-nowrap
                              rounded-[7px]
                              border
                              border-[#BDD5E3]
                              bg-[#F7FBFD]
                              px-[12px]
                              py-[7px]
                              text-[12px]
                              font-semibold
                              text-[#23698F]
                              transition-colors

                              hover:border-[#8DB8CF]
                              hover:bg-[#EDF6FA]
                            "
                          >
                            View Project
                            <ArrowRight
                              size={14}
                              strokeWidth={1.9}
                            />
                          </button>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="
                        px-[20px]
                        py-[60px]
                        text-center
                      "
                    >
                      <p
                        className="
                          text-[15px]
                          font-semibold
                          text-[#536F81]
                        "
                      >
                        No projects found
                      </p>

                      <p
                        className="
                          mt-[5px]
                          text-[12px]
                          text-[#8B9AA4]
                        "
                      >
                        Try changing the search or
                        filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* =====================================================
              MOBILE PROJECT CARDS
          ====================================================== */}
          <div className="hidden max-md:block">
            {paginatedProjects.length > 0 ? (
              <div className="divide-y divide-[#E9EEF1]">
                {paginatedProjects.map(
                  (project) => (
                    <div
                      key={project.project_id}
                      className="px-[15px] py-[17px]"
                    >
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-[12px]
                        "
                      >
                        <div className="min-w-0">
                          <p
                            className="
                              text-[12px]
                              font-semibold
                              text-[#668092]
                            "
                          >
                            {project.project_id}
                          </p>

                          <h3
                            className="
                              mt-[4px]
                              text-[16px]
                              font-semibold
                              leading-[1.4]
                              text-[#153A58]
                            "
                          >
                            {project.project_name}
                          </h3>
                        </div>

                        <RiskBadge
                          risk={project.risk_level}
                        />
                      </div>

                      <div
                        className="
                          mt-[15px]
                          grid
                          grid-cols-2
                          gap-x-[18px]
                          gap-y-[13px]

                          max-[420px]:grid-cols-1
                        "
                      >
                        <MobileDetail
                          label="Implementing Agency"
                          value={
                            getAgencyName(
                              project
                            ) || "—"
                          }
                        />

                        <MobileDetail
                          label="Sanctioned"
                          value={formatCurrency(
                            project.sanctioned_amount
                          )}
                        />

                        <MobileDetail
                          label="Expenditure"
                          value={formatCurrency(
                            getExpenditure(
                              project
                            )
                          )}
                        />

                        <div>
                          <p
                            className="
                              text-[10px]
                              font-semibold
                              uppercase
                              tracking-[0.4px]
                              text-[#8799A4]
                            "
                          >
                            Status
                          </p>

                          <div className="mt-[5px]">
                            <StatusBadge
                              status={
                                project.current_status
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <p
                            className="
                              text-[10px]
                              font-semibold
                              uppercase
                              tracking-[0.4px]
                              text-[#8799A4]
                            "
                          >
                            Progress
                          </p>

                          <div className="mt-[6px]">
                            <ProjectProgress
                              progress={
                                project.progress_percentage
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleProjectOpen(
                            project.project_id
                          )
                        }
                        className="
                          mt-[16px]
                          flex
                          h-[40px]
                          w-full
                          items-center
                          justify-center
                          gap-[7px]
                          rounded-[8px]
                          bg-[#07345C]
                          text-[12px]
                          font-semibold
                          text-white
                          transition-colors

                          hover:bg-[#0B416F]
                        "
                      >
                        View Project
                        <ArrowRight
                          size={15}
                          strokeWidth={1.9}
                        />
                      </button>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div
                className="
                  px-[16px]
                  py-[55px]
                  text-center
                "
              >
                <p
                  className="
                    text-[15px]
                    font-semibold
                    text-[#536F81]
                  "
                >
                  No projects found
                </p>

                <p
                  className="
                    mt-[5px]
                    text-[12px]
                    text-[#8B9AA4]
                  "
                >
                  Try changing the search or filters.
                </p>
              </div>
            )}
          </div>

          {/* =====================================================
              PAGINATION
          ====================================================== */}
          {filteredProjects.length > 0 && (
            <div
              className="
                flex
                items-center
                justify-between
                border-t
                border-[#E8EDF0]
                px-[20px]
                py-[12px]

                max-sm:px-[15px]
              "
            >
              <p
                className="
                  text-[12px]
                  font-medium
                  text-[#718794]
                "
              >
                Page {currentPage} of {totalPages}
              </p>

              <div className="flex items-center gap-[7px]">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.max(1, page - 1)
                    )
                  }
                  className="
                    flex
                    h-[34px]
                    w-[34px]
                    items-center
                    justify-center
                    rounded-[7px]
                    border
                    border-[#DCE5EA]
                    bg-white
                    text-[#547286]

                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <ChevronLeft
                    size={16}
                    strokeWidth={1.8}
                  />
                </button>

                <span
                  className="
                    flex
                    h-[34px]
                    min-w-[34px]
                    items-center
                    justify-center
                    rounded-[7px]
                    bg-[#07345C]
                    px-[9px]
                    text-[12px]
                    font-semibold
                    text-white
                  "
                >
                  {currentPage}
                </span>

                <button
                  type="button"
                  disabled={
                    currentPage === totalPages
                  }
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(
                        totalPages,
                        page + 1
                      )
                    )
                  }
                  className="
                    flex
                    h-[34px]
                    w-[34px]
                    items-center
                    justify-center
                    rounded-[7px]
                    border
                    border-[#DCE5EA]
                    bg-white
                    text-[#547286]

                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <ChevronRight
                    size={16}
                    strokeWidth={1.8}
                  />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </DALayout>
  );
};

/* ============================================================
   TABLE HEADING
============================================================ */
const TableHeading = ({ children }) => {
  return (
    <th
      className="
        px-[15px]
        py-[12px]
        text-left
        text-[11px]
        font-semibold
        uppercase
        tracking-[0.4px]
        text-[#6E8492]
      "
    >
      {children}
    </th>
  );
};

/* ============================================================
   STATUS BADGE
============================================================ */
const StatusBadge = ({ status }) => {
  const styles = {
    COMPLETED:
      "bg-[#E7F4EC] text-[#34734F]",

    ONGOING:
      "bg-[#E7F2F8] text-[#2B6F98]",

    IN_PROGRESS:
      "bg-[#E7F2F8] text-[#2B6F98]",

    ON_HOLD:
      "bg-[#FFF2DD] text-[#99691F]",

    DELAYED:
      "bg-[#FCE8E6] text-[#B94D45]",

    NOT_STARTED:
      "bg-[#EEF1F3] text-[#667984]",
  };

  return (
    <span
      className={`
        inline-flex
        whitespace-nowrap
        rounded-full
        px-[9px]
        py-[5px]
        text-[10px]
        font-semibold

        ${
          styles[status] ||
          "bg-[#EEF1F3] text-[#667984]"
        }
      `}
    >
      {formatStatus(status)}
    </span>
  );
};

/* ============================================================
   RISK BADGE
============================================================ */
const RiskBadge = ({ risk }) => {
  const normalizedRisk =
    risk?.toString().toLowerCase() || "";

  if (!risk) {
    return (
      <span
        className="
          text-[12px]
          font-medium
          text-[#98A5AD]
        "
      >
        —
      </span>
    );
  }

  const styles = {
    high:
      "bg-[#FCE8E6] text-[#B94D45]",

    medium:
      "bg-[#FFF2DD] text-[#98691F]",

    low:
      "bg-[#E9F4ED] text-[#42765A]",
  };

  return (
    <span
      className={`
        inline-flex
        whitespace-nowrap
        rounded-full
        px-[9px]
        py-[5px]
        text-[10px]
        font-semibold

        ${
          styles[normalizedRisk] ||
          "bg-[#EEF1F3] text-[#667984]"
        }
      `}
    >
      {formatStatus(risk)}
    </span>
  );
};

/* ============================================================
   PROJECT PROGRESS
============================================================ */
const ProjectProgress = ({ progress }) => {
  if (
    progress === undefined ||
    progress === null ||
    Number.isNaN(Number(progress))
  ) {
    return (
      <span
        className="
          text-[12px]
          font-medium
          text-[#94A2AB]
        "
      >
        —
      </span>
    );
  }

  const value = Math.max(
    0,
    Math.min(100, Number(progress))
  );

  return (
    <div className="w-[105px]">
      <span
        className="
          text-[11px]
          font-semibold
          text-[#44677C]
        "
      >
        {value}%
      </span>

      <div
        className="
          mt-[5px]
          h-[5px]
          overflow-hidden
          rounded-full
          bg-[#E4EBEF]
        "
      >
        <div
          className="
            h-full
            rounded-full
            bg-[#3382AC]
          "
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
};

/* ============================================================
   MOBILE DETAIL
============================================================ */
const MobileDetail = ({
  label,
  value,
}) => {
  return (
    <div>
      <p
        className="
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.4px]
          text-[#8799A4]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-[4px]
          text-[13px]
          font-medium
          text-[#496A7F]
        "
      >
        {value}
      </p>
    </div>
  );
};

/* ============================================================
   HELPERS
============================================================ */

/*
 * Mock data currently uses `ida`.
 * Later API can use `implementing_agency`.
 */
const getAgencyName = (project) => {
  return (
    project.implementing_agency ||
    project.ida ||
    ""
  );
};

const getExpenditure = (project) => {
  return (
    project.expenditure_amount ??
    project.total_expenditure ??
    project.expenditure ??
    null
  );
};

const getProjectSequence = (projectId) => {
  if (!projectId) {
    return 0;
  }

  const parts =
    projectId.toString().split("-");

  const lastPart = Number(
    parts[parts.length - 1]
  );

  return Number.isNaN(lastPart)
    ? 0
    : lastPart;
};

const formatStatus = (status) => {
  if (!status) {
    return "—";
  }

  return status
    .toString()
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
};

const formatCurrency = (amount) => {
  if (
    amount === undefined ||
    amount === null ||
    amount === "" ||
    Number.isNaN(Number(amount))
  ) {
    return "—";
  }

  return `₹${Number(
    amount
  ).toLocaleString("en-IN")}`;
};

export default DAProjectMonitoring;